import '@/styles/global.css';

import React, { ReactNode } from 'react';

import GlassPane from '@/components/GlassPane.component';

export default function AuthRootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<head title='Authentication' />
			<body className='h-screen w-screen rainbow-mesh p-6'>
				<GlassPane className='w-full h-full flex items-center justify-center'>
					{children}
				</GlassPane>
			</body>
		</html>
	);
}
