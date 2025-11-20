import { NextResponse } from 'next/server';
import type { ProjectFormData } from '@/types';
import { db } from '@/db/db';
import { project } from '@/db/schema/project';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await db.select().from(project).where(eq(project.id, parseInt(id)));
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: ProjectFormData = await request.json();
    
    const [updatedProject] = await db.update(project)
      .set({
        name: body.name,
        description: body.description || null,
        myRole: body.myRole || null,
        techStack: body.techStack || [],
        features: body.features || [],
        linkGit: body.linkGit || null,
        linkDemo: body.linkDemo || null,
        status: body.status,
        images: body.images || [],
      })
      .where(eq(project.id, parseInt(id)))
      .returning();
    
    if (!updatedProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await db.delete(project)
      .where(eq(project.id, parseInt(id)))
      .returning();
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
