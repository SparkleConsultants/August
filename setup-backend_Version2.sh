#!/bin/bash

echo "🚗 Setting up Adir Transport Backend..."

if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Installing..."
    npm install -g supabase
else
    echo "✅ Supabase CLI found"
fi

if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and run this script again."
    exit 1
else
    echo "✅ Docker is running"
fi

if [ ! -f "supabase/config.toml" ]; then
    echo "📁 Initializing Supabase project..."
    supabase init
else
    echo "✅ Supabase project already initialized"
fi

echo "🚀 Starting Supabase services..."
supabase start

echo "📋 Getting Supabase credentials..."
supabase status

if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "⚠️  Please update .env.local with your actual Supabase credentials shown above"
else
    echo "✅ .env.local already exists"
fi

echo "🗄️  Setting up database schema..."
supabase db reset --debug

echo ""
echo "🎉 Backend setup complete!"