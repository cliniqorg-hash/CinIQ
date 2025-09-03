import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics'

const firebaseConfig = {
	apiKey: 'AIzaSyC-xOWpdHgcWaUpB1-e3bFkJU4shbkycHg',
	authDomain: 'cliniq-d4609.firebaseapp.com',
	projectId: 'cliniq-d4609',
	storageBucket: 'cliniq-d4609.firebasestorage.app',
	messagingSenderId: '892655431065',
	appId: '1:892655431065:web:75a800db9b1eac0eaf3708',
	measurementId: 'G-FWQXB27JWS',
}

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)

export async function initAnalytics(): Promise<Analytics | null> {
	if (typeof window === 'undefined') {
		return null
	}
	try {
		const supported = await isSupported()
		return supported ? getAnalytics(firebaseApp) : null
	} catch {
		return null
	}
} 