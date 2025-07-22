# Deployment Guide

This document outlines the CI/CD pipeline and deployment process for `@ux_bob/yv-iwc`.

## Overview

The project uses **Changesets** for version management and **GitHub Actions** for automated CI/CD. There are two main deployment workflows:

1. **Automated Release** - Triggered by changesets on main branch
2. **Manual Release** - Triggered manually via GitHub Actions

## Prerequisites

### Required Secrets

Configure these secrets in your GitHub repository settings:

- `NPM_TOKEN` - npm authentication token for publishing
- `GITHUB_TOKEN` - Automatically provided by GitHub Actions

### NPM Token Setup

1. Log in to [npmjs.com](https://www.npmjs.com)
2. Go to Access Tokens → Generate New Token
3. Choose "Automation" type for CI/CD
4. Copy the token and add it to GitHub Secrets as `NPM_TOKEN`

## Automated Release Workflow

### How It Works

1. **Development**: Make changes and create changesets
2. **PR Creation**: Changesets bot creates/updates a "Release" PR
3. **Merge**: When Release PR is merged, package is automatically published

### Step-by-Step Process

#### 1. Create a Changeset

After making changes, create a changeset to document what changed:

```bash
pnpm changeset
```

This will:

- Prompt you to select which packages changed
- Ask for the type of change (patch/minor/major)
- Request a description of the changes

#### 2. Commit and Push

```bash
git add .
git commit -m "feat: add new feature"
git push
```

#### 3. Automatic PR Creation

The Changesets GitHub Action will:

- Create or update a "Release" PR
- Include all pending changesets
- Show the version bump and changelog

#### 4. Review and Merge

- Review the Release PR
- Merge when ready to publish
- Package is automatically published to npm

## Manual Release Workflow

For immediate releases or when you need more control:

### Via GitHub Actions UI

1. Go to **Actions** tab in GitHub
2. Select **Release** workflow
3. Click **Run workflow**
4. Choose version bump type (patch/minor/major)
5. Click **Run workflow**

### Via Command Line

```bash
# Create a changeset
pnpm changeset

# Version packages (updates package.json and CHANGELOG.md)
pnpm run version

# Commit version changes
git add .
git commit -m "chore: version packages"
git push

# Publish to npm
pnpm run release
```

## CI/CD Pipeline Details

### Continuous Integration (ci.yml)

Runs on every push and PR:

```yaml
Jobs:
├── test (runs on all branches)
│   ├── Type checking (tsc)
│   ├── Unit tests (vitest)
│   ├── Build library
│   └── Build Next.js example
└── publish-check (main branch only)
    └── Automated publishing via changesets
```

### Manual Release (release.yml)

Triggered manually with version type selection:

```yaml
Jobs:
└── release
    ├── Run full CI checks
    ├── Create changeset
    ├── Version packages
    ├── Commit changes
    └── Publish to npm
```

## Version Management

### Semantic Versioning

- **patch** (1.0.0 → 1.0.1): Bug fixes, small improvements
- **minor** (1.0.0 → 1.1.0): New features, backwards compatible
- **major** (1.0.0 → 2.0.0): Breaking changes

### Changeset Types

```bash
# Bug fix
pnpm changeset
# Select: patch
# Description: "Fix component rendering issue"

# New feature
pnpm changeset
# Select: minor
# Description: "Add new prop for custom styling"

# Breaking change
pnpm changeset
# Select: major
# Description: "Remove deprecated API methods"
```

## Quality Gates

All releases must pass:

- ✅ TypeScript type checking
- ✅ Unit tests
- ✅ Successful build
- ✅ Next.js example builds

## Troubleshooting

### Failed Publication

If npm publish fails:

1. Check NPM_TOKEN is valid and has publish permissions
2. Verify package name is available
3. Ensure version number hasn't been published already

### CI Failures

Common issues:

- **Type errors**: Fix TypeScript issues
- **Test failures**: Update or fix failing tests
- **Build errors**: Check tsup configuration and dependencies

### Rollback

If you need to rollback a release:

```bash
# Unpublish specific version (within 24 hours)
npm unpublish @ux_bob/yv-iwc@1.2.3

# Or deprecate the version
npm deprecate @ux_bob/yv-iwc@1.2.3 "This version has issues, use 1.2.2"
```

## Best Practices

1. **Always create changesets** for user-facing changes
2. **Test thoroughly** before merging Release PRs
3. **Use semantic versioning** correctly
4. **Keep changelogs meaningful** - write clear descriptions
5. **Monitor npm downloads** and user feedback after releases
6. **Use manual releases sparingly** - prefer the automated workflow

## Monitoring

After deployment, monitor:

- npm package page for download stats
- GitHub Issues for bug reports
- GitHub Discussions for user feedback
- Dependency security alerts
