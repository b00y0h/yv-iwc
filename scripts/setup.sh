#!/bin/bash

# Setup script for new contributors
echo "🚀 Setting up @ux_bob/yv-iwc development environment..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install it first:"
    echo "   npm install -g pnpm"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Setup git hooks
echo "🪝 Setting up git hooks..."
pnpm run prepare

# Build the library
echo "🔨 Building library..."
pnpm run build

# Run tests to ensure everything works
echo "🧪 Running tests..."
pnpm run test

echo "✅ Setup complete! You can now:"
echo "   • Start development: pnpm run dev:all"
echo "   • Run tests: pnpm run test"
echo "   • Create changesets: pnpm changeset"
echo ""
echo "📚 Read DEVELOPMENT.md for detailed development guide"
echo "🚀 Read DEPLOYMENT.md for release process"
