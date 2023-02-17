import '@/styles/global.css';

import React, { ReactNode } from 'react';

import GlassPane from '@/components/GlassPane.component';
import Sidebar from '@/components/Sidebar.component';

export default function DashboardRootLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<html lang='en'>
			<head title='Dashboard' />
			<body className='h-screen w-screen rainbow-mesh p-6'>
				<GlassPane className='w-full h-full flex items-center justify-center p-6'>
					<Sidebar />
					<main className='w-full pl-6 h-full'>{children}</main>
				</GlassPane>
				<div id='modal'></div>
			</body>
		</html>
	);
}
