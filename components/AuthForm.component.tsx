'use client';

import { ChangeEvent, useCallback, useState } from 'react';
import { register, signin } from '@/lib/api';

import Button from './Button.component';
import Card from './Card.component';
import Input from './Input.component';
import Link from 'next/link';
import React from 'react';
import { UserModel } from '@/models/user.model';
import { useRouter } from 'next/navigation';

const registerContent = {
	linkUrl: '/signin',
	linkText: 'Already have an account?',
	header: 'Create a new Account',
	subheader: 'Just a few things to get started',
	buttonText: 'Register',
};

const signinContent = {
	linkUrl: '/register',
	linkText: "Don't have an account?",
	header: 'Welcome Back',
	subheader: 'Enter your credentials to access your account',
	buttonText: 'Sign In',
};

const initialUserModel: UserModel = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
};
export default function AuthForm({
	mode = 'signin',
}: {
	mode: 'register' | 'signin';
}) {
	const content = mode === 'register' ? registerContent : signinContent;
	const [formState, setFormState] = useState(initialUserModel);
	const [error, setError] = useState('');
	const router = useRouter();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (mode === 'register') {
				await register(formState);
			} else {
				await signin(formState);
			}

			router.replace('/home');
		} catch (e: any) {
			setError(`Could not ${mode}`);
			alert('Your email/password incorrect!');
		} finally {
			setFormState({ ...initialUserModel });
		}
	};

	return (
		<Card>
			<div className='w-full'>
				<div className='text-center'>
					<h2 className='text-3xl mb-2'>{content.header}</h2>
					<p className='tex-lg text-black/25'>{content.subheader}</p>
				</div>
				<form className='py-10 w-full'>
					{mode === 'register' && (
						<div className='flex mb-8 justify-between'>
							<div className='pr-2'>
								<div className='text-lg mb-4 ml-2 text-black/50'>
									First Name
								</div>
								<Input
									required
									placeholder='First Name'
									value={formState.firstName}
									className='border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full'
									onChange={(e) =>
										setFormState((s) => ({ ...s, firstName: e.target.value }))
									}
								/>
							</div>
							<div className='pl-2'>
								<div className='text-lg mb-4 ml-2 text-black/50'>Last Name</div>
								<Input
									required
									placeholder='Last Name'
									value={formState.lastName}
									className='border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full'
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setFormState((s) => ({ ...s, lastName: e.target.value }))
									}
								/>
							</div>
						</div>
					)}
					<div className='mb-8'>
						<div className='text-lg mb-4 ml-2 text-black/50'>Email</div>
						<Input
							required
							type='email'
							placeholder='Email'
							value={formState.email}
							className='border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full'
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setFormState((s) => ({ ...s, email: e.target.value }))
							}
						/>
					</div>
					<div className='mb-8'>
						<div className='text-lg mb-4 ml-2 text-black/50'>Password</div>
						<Input
							required
							type='password'
							placeholder='Password'
							value={formState.password}
							className='border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full'
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setFormState((s) => ({ ...s, password: e.target.value }))
							}
						/>
					</div>
					<div className='flex items-center justify-between'>
						<div>
							<span>
								<Link
									href={content.linkUrl}
									className='text-blue-600 font-bold'
								>
									{content.linkText}
								</Link>
							</span>
						</div>
						<div>
							<Button onClick={handleSubmit} type='submit' intent='secondary'>
								{content.buttonText}
							</Button>
						</div>
					</div>
				</form>
			</div>
		</Card>
	);
}
