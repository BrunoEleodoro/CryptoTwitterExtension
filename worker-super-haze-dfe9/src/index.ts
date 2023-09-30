/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { ethers } from 'ethers';
import handleProxy from './proxy.js';
import handleRedirect from './redirect.js';
import apiRouter from './router.js';

// Export a default object containing event handlers
export default {
	// The fetch handler is invoked when this worker receives a HTTP(S) request
	// and should return a Response (optionally wrapped in a Promise)
	async fetch(request, env, ctx) {
		// You'll find it helpful to parse the request.url string into a URL object. Learn more at https://developer.mozilla.org/en-US/docs/Web/API/URL
		const account = request.url.split('?account=')[1];

		// // You can get pretty far with simple logic like if/switch-statements
		// switch (url.pathname) {
		//   case '/redirect':
		//     return handleRedirect.fetch(request, env, ctx);

		//   case '/proxy':
		//     return handleProxy.fetch(request, env, ctx);
		// }

		// if (url.pathname.startsWith('/api/')) {
		//   // You can also use more robust routing
		//   return apiRouter.handle(request);
		// }
		const provider = new ethers.JsonRpcProvider('https://mainnet.base.org');
		const contract = new ethers.Contract(
			'0xcc62E6AcA6c73d739AFEF260BEF10Ed8FdC7641A',
			[
				{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
				{
					inputs: [{ internalType: 'string', name: '_twitterHandle', type: 'string' }],
					name: 'getAddress',
					outputs: [{ internalType: 'address', name: '', type: 'address' }],
					stateMutability: 'view',
					type: 'function',
				},
				{
					inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
					name: 'getTwitterHandle',
					outputs: [{ internalType: 'string', name: '', type: 'string' }],
					stateMutability: 'view',
					type: 'function',
				},
				{
					inputs: [{ internalType: 'string', name: '_twitterHandle', type: 'string' }],
					name: 'setTwitterHandle',
					outputs: [],
					stateMutability: 'nonpayable',
					type: 'function',
				},
				{
					inputs: [{ internalType: 'address', name: '', type: 'address' }],
					name: 'twitterHandles',
					outputs: [{ internalType: 'string', name: '', type: 'string' }],
					stateMutability: 'view',
					type: 'function',
				},
				{
					inputs: [{ internalType: 'string', name: '', type: 'string' }],
					name: 'twitterHandlesReverse',
					outputs: [{ internalType: 'address', name: '', type: 'address' }],
					stateMutability: 'view',
					type: 'function',
				},
			],
			provider
		);

		const res = await contract.twitterHandlesReverse(account ?? '');
		const json = JSON.stringify({ res }, null, 2);
		return new Response(json, {
			headers: {
				// content type json
				'content-type': 'application/json;charset=UTF-8',
				// CORS
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': '*',
			},
		});
	},
};
