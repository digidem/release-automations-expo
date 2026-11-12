# Moving the release flow to comapeo-mobile

What is left to do in comapeo-mobile once the practice runs below pass.

## Practice runs

- [x] Start Scheduled Release creates `release/v9.x`, the RC PR and an RC build
- [x] Merging the RC PR releases nothing
- [x] Release iOS uploads to App Store Connect
- [x] Release iOS a second time for the same version
- [x] Release Android (submit unchecked) creates the tag and GitHub Release, and ends with a red X because there is no APK
- [x] Build APK attaches the APK to that GitHub Release
- [x] Update Release Notes changes the GitHub Release notes

## Copy over

- New: `release-android.yml`, `release-ios.yml`, `build-apk.yml`, `update-release-notes.yml`
- Changed: `scheduled-release.yml`, `hotfix-release.yml` (RC PR text)
- Delete: `build-release.yml`
- `eas.json`: add the `production-apk` profile
- `eas.json`: change the iOS `image` from `latest` to `macos-tahoe-26.5-xcode-26.6`, once a practice iOS build passes with it. `latest` moved to Xcode 27.1, and Expo SDK 56 doesn't compile on it (`expo-modules-jsi`, "command failed with exit code 0"). Xcode 26.6 is what comapeo-mobile last built on, on 2026-11-02.

Do not copy `app.json`, `app.config.js`, the rest of `eas.json`, `.prettierignore` or `ci.yml`. Those changes only point the practice repo at the `comapeo-ios-practice` Expo project.

## Also needed

- Merge #2203 (fix: android upload and release, open since 2026-11-03) before the first real release. It fixes the `mc` download in `scripts/upload-release.sh` (#2201). Until then, the hook can't upload the APK to `downloads.comapeo.app`, so every Release Android run ends without an APK and with a red X.
- `docs/Releases.md`: merging the RC PR no longer releases; describe the four new workflows.
- The workflows only run from branches that contain them. To release from a branch cut before the move (e.g. `release/v14.x`), cherry-pick them onto it first.

## Open questions

- Build APK puts the APK on EAS and the GitHub Release, but not on `downloads.comapeo.app`, which the website uses. `scripts/upload-release.sh` skips any profile other than `production`, `release-candidate` and `pre-release`. If Build APK should update the website too, add `production-apk` there, after #2203 is merged.
- Before moving iOS builds to Xcode 27 (a later Expo SDK), raise the iOS 15 minimum for `RNDeviceInfo` (9.0, from `react-native-device-info`) and `RNSVG` (12.4, from `react-native-svg`). Xcode 27.1 fails the build on anything below iOS 15. Xcode 26.6 accepts 12.0 and up, and only warns about `RNDeviceInfo`'s 9.0.
