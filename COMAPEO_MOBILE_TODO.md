# Moving the release flow to comapeo-mobile

What is left to do in comapeo-mobile once the practice runs below pass.

## Practice runs

- [ ] Start Scheduled Release creates `release/v9.x`, the RC PR and an RC build
- [ ] Merging the RC PR releases nothing
- [ ] Release iOS uploads to App Store Connect
- [ ] Release iOS a second time for the same version
- [ ] Release Android (submit unchecked) creates the tag and GitHub Release, and ends with a red X because there is no APK
- [ ] Build APK attaches the APK to that GitHub Release
- [ ] Update Release Notes changes the GitHub Release notes

## Copy over

- New: `release-android.yml`, `release-ios.yml`, `build-apk.yml`, `update-release-notes.yml`
- Changed: `scheduled-release.yml`, `hotfix-release.yml` (RC PR text)
- Delete: `build-release.yml`
- `eas.json`: add the `production-apk` profile

Do not copy `app.json`, `app.config.js`, the rest of `eas.json`, `.prettierignore` or `ci.yml`. Those changes only point the practice repo at the `comapeo-ios-practice` Expo project.

## Also needed

- `docs/Releases.md`: merging the RC PR no longer releases; describe the four new workflows.
- The workflows only run from branches that contain them. To release from a branch cut before the move (e.g. `release/v14.x`), cherry-pick them onto it first.

## Open questions

- Build APK puts the APK on EAS and the GitHub Release, but not on `downloads.comapeo.app`, which the website uses. `scripts/upload-release.sh` skips any profile other than `production`, `release-candidate` and `pre-release`. If Build APK should update the website too, add `production-apk` there, after #2203 is merged.
