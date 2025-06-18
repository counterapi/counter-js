# Manual Release Workflow

This document explains how to use the manual release GitHub Action to create new versions of the counterapi package.

## Overview

The manual release workflow allows you to:
- Choose the version bump type (patch, minor, or major)
- Automatically update `package.json` with the new version
- Create a git tag for the release
- Publish directly to NPM
- Generate a changelog from recent commits
- Create a GitHub release with release assets

All in a single workflow execution.

## How to Use

### 1. Navigate to GitHub Actions

1. Go to your repository: [https://github.com/counterapi/counter.js](https://github.com/counterapi/counter.js)
2. Click on the "Actions" tab
3. In the left sidebar, click on "Release"

### 2. Trigger the Workflow

1. Click "Run workflow" button
2. Choose your options:
   - **Branch**: Usually `main`
   - **Version bump type**: 
     - `patch` - Bug fixes (1.0.0 → 1.0.1)
     - `minor` - New features (1.0.0 → 1.1.0)
     - `major` - Breaking changes (1.0.0 → 2.0.0)
   - **Release notes** (optional): Add custom release notes

3. Click "Run workflow"

### 3. What Happens Next

The workflow will:

1. **Run Tests**: Ensures all tests pass before releasing
2. **Run Linting**: Checks code quality
3. **Build Project**: Verifies the build works
4. **Bump Version**: Updates `package.json` with new version
5. **Create Git Tag**: Tags the commit with the new version
6. **Publish to NPM**: Immediately publishes the package to NPM
7. **Create GitHub Release**: Publishes the release on GitHub with changelog and package assets

## Version Bump Types

### Patch (1.0.0 → 1.0.1)
Use for:
- Bug fixes
- Documentation updates
- Internal code improvements
- Security patches

### Minor (1.0.0 → 1.1.0)
Use for:
- New features
- New API methods
- Backward-compatible changes
- New optional parameters

### Major (1.0.0 → 2.0.0)
Use for:
- Breaking changes
- API redesigns
- Removing deprecated features
- Changes that require users to modify their code

## Example Scenarios

### Bug Fix Release
```
Version bump type: patch
Release notes: "Fixed issue with authentication headers in browser environments"
```

### New Feature Release
```
Version bump type: minor
Release notes: "Added support for batch counter retrieval and improved error handling"
```

### Breaking Change Release
```
Version bump type: major
Release notes: "BREAKING: Removed deprecated CounterClient alias. Use Counter class instead."
```

## Release Timeline

1. **Manual Trigger** → Workflow starts
2. **~2-3 minutes** → Tests, build, and version bump complete
3. **~1-2 minutes** → Git tag created, NPM publish completes
4. **~30 seconds** → GitHub release created with assets
5. **Total: ~4-5 minutes** → Package available on NPM and GitHub

## Monitoring the Release

### Single Workflow
- Monitor the "Release & Publish" workflow in Actions tab
- All steps (testing, versioning, NPM publish, GitHub release) happen in one workflow

### GitHub Release
- Check the [Releases page](https://github.com/counterapi/counter.js/releases)
- Verify the release was created with correct version and notes

### NPM Package
- Check [npmjs.com/package/counterapi](https://npmjs.com/package/counterapi) for the new version
- Package should be available immediately after workflow completes

### Rollback if Needed
If something goes wrong:
1. Delete the GitHub release
2. Delete the git tag: `git push --delete origin vX.X.X`
3. Reset `package.json` to previous version
4. Push fixes and retry

## Best Practices

1. **Test Locally First**: Always test your changes locally before releasing
2. **Use Semantic Versioning**: Follow semver.org guidelines
3. **Write Clear Release Notes**: Help users understand what changed
4. **Monitor After Release**: Check that NPM publish succeeds
5. **Update Documentation**: Ensure README and docs are current

## Troubleshooting

### Workflow Fails at Tests
- Fix the failing tests
- Push the fixes to `main`
- Re-run the release workflow

### Git Push Fails
- Usually means you don't have push permissions
- Check repository settings and your permissions

### NPM Publish Fails
- Check that `NPM_TOKEN` secret is set correctly
- Verify the token has publish permissions
- Ensure package name is available on NPM

### Version Already Exists
- NPM doesn't allow republishing the same version
- Delete the GitHub release and tag
- Fix any issues and bump to next version

## Support

If you encounter issues with the release process:
1. Check the workflow logs in GitHub Actions
2. Review this documentation
3. Check NPM and GitHub status pages
4. Contact the development team 