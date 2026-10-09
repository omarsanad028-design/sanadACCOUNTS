# سند — تطبيق أندرويد

## الطريقة 1: بدون تثبيت أي شيء (GitHub)
1. أنشئ مستودعاً جديداً على GitHub وارفع محتويات هذا المجلد كما هي.
2. افتح تبويب **Actions** ← **Build APK** ← **Run workflow**.
3. بعد دقائق حمّل الملف `sanad-apk` ← بداخله `app-debug.apk`، انقله للهاتف وثبّته (فعّل "التثبيت من مصادر غير معروفة").

## الطريقة 2: على جهازك
المتطلبات: Node 18+، JDK 17، Android Studio.
```
npm install
npx cap add android
npx cap sync android
npx cap open android      # ثم Build ▸ Build APK
```
أو من سطر الأوامر: `cd android && ./gradlew assembleDebug`

## تحديث التطبيق لاحقاً
استبدل `www/index.html` بالنسخة الجديدة (مع إبقاء سطر `native-bridge.js` قبل `</head>`) ثم `npx cap sync android` وأعد البناء.
