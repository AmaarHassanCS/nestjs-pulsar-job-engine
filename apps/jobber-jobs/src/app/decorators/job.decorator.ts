import { applyDecorators, Injectable, SetMetadata } from '@nestjs/common';
import { JobMetadata } from '../interfaces/job-metadata.interface';

export const JOB_METADATA_KEY = 'job_meta';
export const Job = (meta: JobMetadata) =>
  applyDecorators(
    // a helper method to apply multiple decorators
    Injectable(),
    SetMetadata(JOB_METADATA_KEY, meta)
  );
