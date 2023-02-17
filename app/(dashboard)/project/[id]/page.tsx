import TasksCard from '@/components/TaskCard.component';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { getUserFromCookie } from '@/lib/auth';

const getData = async (id) => {
	const user = await getUserFromCookie(cookies());
	const project = await db.project.findFirst({
		where: {
			id,
			// ownerId: user?.id
		},
		include: {
			tasks: true,
		},
	});

	return project;
};

export default async function ProjectPage({ params }) {
	const project = (await getData(params.id)) || null;

	return (
		<div className='h-full overflow-y-auto pr-6 w-1/1'>
			{/* @ts-expect-error Server Component */}
			<TasksCard tasks={project?.tasks} title={project?.name} />
		</div>
	);
}
