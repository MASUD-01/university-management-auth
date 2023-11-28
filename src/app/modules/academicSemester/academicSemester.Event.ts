import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_SEMESTER_CREATED,
  EVENT_ACADEMIC_SEMESTER_UPDATED,
} from './academicSemester.constant';
import { IAcademicSemesterCreateEvent } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

//46.7 video
const initAcademicSemeterEvents = () => {
  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_CREATED, async (e: string) => {
    const data: IAcademicSemesterCreateEvent = JSON.parse(e);
    await AcademicSemesterService.createSemesterFromEvent(data);
    console.log(data);
  });
  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_UPDATED, async (e: string) => {
    const data: IAcademicSemesterCreateEvent = JSON.parse(e);
    await AcademicSemesterService.updatedOneIntoDBFromEvent(data);
    console.log('updated data');
    console.log(data);
  });
};

export default initAcademicSemeterEvents;
