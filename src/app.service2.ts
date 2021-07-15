import { Injectable } from '@nestjs/common';
import  axios  from 'axios';
import { zip } from 'rxjs/operators';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello rtrtn!';
  }
  getWorkTime(userIdParam : number, dateParam : string /* string в формате 'YYYY-MM-DD' */):number {
    var z=0;
    axios.get(`http://admin:thuvj1sh@dev-redmine.gnedov.info:8380/time_entries.json?user_id=${userIdParam}&spent_on=${dateParam}`).then (function (response) {
     
      var z=0;
      var timeEntries = response.data.time_entries; // массив
      for (var i = 1; i < timeEntries.length; i++) {
        var timeItem = timeEntries[i];
        
        var user = timeItem.user; // user = { id: 1, name: 'Redmine Admin' }
        var userName = user.name; // 'Redmine Admin'
        var hours = timeItem.hours;
        var Date = timeItem.spent_on;
        console.log(i, ':', 'userName =', userName, '; Hours =', hours, '; Date =', Date);
        z=z+timeItem.hours;
        console.log(z);
      }
    })
    return z;
  }
}


