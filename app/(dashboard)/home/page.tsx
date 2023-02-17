import Greetings from '@/components/Greetings.component';
import GreetingsSkeleton from '@/components/GreetingsSkeleton';
import Link from 'next/link';
import NewProject from '@/components/NewProject.component';
import ProjectCard from '@/components/ProjectCard.component';
import React from 'react';
import { Suspense } from 'react';
import TasksCard from '@/components/TaskCard.component';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { delay } from '@/lib/async';
import { getUserFromCookie } from '@/lib/auth';

const getData = async () => {
	await delay(2000);
	const user = await getUserFromCookie(cookies());
	const projects = await db.project.findMany({
		where: {
			ownerId: user?.id,
		},
		include: {
			tasks: true,
		},
	});

	return { projects };
};

export default async function Page() {
	const { projects } = await getData();

	return (
		<div className='h-full overflow-y-auto pr-6 w-full'>
			<div className='h-full items-stretch justify-center min-h-[content]'>
				<div className='flex-1 grow flex'>
					<Suspense fallback={<GreetingsSkeleton />}>
						{/* @ts-expect-error Server Component */}
						<Greetings />
					</Suspense>
				</div>
				<div className='flex flex-2 grow items-center flex-wrap mt-3 -m-3'>
					{projects.map((project) => (
						<div key={project.id} className='w-1/3 p-3'>
							<Link href={`/project/${project.id}`}>
								<ProjectCard project={project} />
							</Link>
						</div>
					))}
					<div className='w-1/3 p-3'>
						<NewProject />
					</div>
				</div>
				<div className='mt-6 flex-2 grow w-full flex'>
					<div className='w-full'>
						{/* @ts-expect-error Server Component */}
						<TasksCard title={'Your tasks'} />
					</div>
				</div>
			</div>
		</div>
	);
}
