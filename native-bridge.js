// جسر بين التطبيق وأندرويد: الحفظ والمشاركة للملفات (WebView لا يدعم تحميل blob مباشرة)
(function(){
  var C=window.Capacitor; if(!C||!C.isNativePlatform||!C.isNativePlatform())return;
  var P=C.Plugins||{}, FS=P.Filesystem, SH=P.Share;
  if(!FS||!SH)return;
  function b64(blob){return new Promise(function(res,rej){var r=new FileReader();
    r.onload=function(){res(String(r.result).split(',')[1]);};r.onerror=rej;r.readAsDataURL(blob);});}
  async function shareBlob(blob,name){
    var data=await b64(blob);
    var w=await FS.writeFile({path:name,data:data,directory:'CACHE'});
    await SH.share({title:name,url:w.uri,dialogTitle:'حفظ / مشاركة'});
  }
  // الروابط ذات download
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[download]');
    if(!a||!/^blob:/.test(a.href))return;
    e.preventDefault();e.stopPropagation();
    fetch(a.href).then(function(r){return r.blob();})
      .then(function(b){return shareBlob(b,a.getAttribute('download')||'sanad-export');})
      .catch(function(err){console.error(err);});
  },true);
  // navigator.share مع ملفات
  var orig=navigator.share&&navigator.share.bind(navigator);
  navigator.share=async function(d){
    d=d||{};
    if(d.files&&d.files.length){return shareBlob(d.files[0],d.files[0].name||'sanad-export');}
    return SH.share({title:d.title,text:d.text,url:d.url,dialogTitle:d.title});
  };
  navigator.canShare=function(){return true;};
})();
