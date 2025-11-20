import { NextResponse } from 'next/server';
import type { ProjectFormData } from '@/types';
import { db } from '@/db/db';
import { project } from '@/db/schema/project';

export async function GET() {
  try {
    const projects = await db.select().from(project);
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: ProjectFormData = await request.json();
    
    const [newProject] = await db.insert(project).values({
      name: body.name,
      description: body.description || null,
      myRole: body.myRole || null,
      techStack: body.techStack || [],
      features: body.features || [],
      linkGit: body.linkGit || null,
      linkDemo: body.linkDemo || null,
      status: body.status,
      images: body.images || [],
    }).returning();
    
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
