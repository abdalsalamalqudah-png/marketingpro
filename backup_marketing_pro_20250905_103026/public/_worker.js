// This file indicates this is a Cloudflare Pages project with Functions
// It will be automatically handled by the build process

export default {
  async fetch(request, env) {
    // This will be replaced by the actual built worker from dist/_worker.js
    return new Response('Marketing Pro - Build in progress...', {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};