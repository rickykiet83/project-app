import Card from './Card.component';
import Image from 'next/legacy/image';
import { LinkModel } from '@/models/link.model';
import React from 'react';
import SidebarLink from './SidebarLink.component';
import logo from '@/assets/images/logo.png';

const links: LinkModel[] = [
	{ label: 'Home', icon: 'Grid', link: '/home' },
	{
		label: 'Calendar',
		icon: 'Calendar',
		link: '/calendar',
	},
	{ label: 'Profile', icon: 'User', link: '/profile' },
	{
		label: 'Settings',
		icon: 'Settings',
		link: '/settings',
	},
];

export default function Sidebar() {
	return (
		<Card className='h-full w-40 flex items-center justify-between flex-wrap'>
			<div className='w-full flex justify-center items-center'>
				<Image src={logo} alt='Able logo' priority className='w-14' />
			</div>
			{links.map((link, idx) => (
				<SidebarLink key={idx} link={link} />
			))}
		</Card>
	);
}
