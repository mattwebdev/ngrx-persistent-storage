"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const localForage = require("localforage");
const middleware_storage_1 = require("./middleware-storage");
const options_1 = require("./options");
const storage_sync_1 = require("./storage-sync");
const sessionStorageDriver = require("localforage-driver-session-storage");
exports.getAllDataFromLocalForage = (options) => {
    options_1.config.keys = options.keys;
    options_1.config.storage = middleware_storage_1.middlewareStorage;
    const driver = options.driver;
    if (driver === 'SESSIONSTORAGE') {
        localForage.config({
            name: 'NGRX Storage',
            version: 1.0,
            size: 4980736,
            storeName: 'keyvaluepairs',
            description: 'NGRX storage persist'
        });
        localForage.defineDriver(sessionStorageDriver);
        localForage.setDriver(sessionStorageDriver._driver);
    }
    else {
        localForage.config({
            driver: driver || localForage.LOCALSTORAGE,
            name: 'NGRX Storage',
            version: 1.0,
            size: 4980736,
            storeName: 'keyvaluepairs',
            description: 'NGRX storage persist'
        });
    }
    return localForage.keys()
        .then(keys => {
        return Promise.all(keys.map((key) => localForage.getItem(key).then(data => [key, data])));
    })
        .then(dataWithKeys => {
        const dataStorage = dataWithKeys.reduce((previousValue, [key, data]) => {
            previousValue[key] = data;
            return previousValue;
        }, {});
        middleware_storage_1.middlewareStorage.dataStorage = dataStorage;
        return dataStorage;
    });
};
function storageSyncMetaReducer(reducer) {
    return storage_sync_1.storageSync(reducer);
}
exports.storageSyncMetaReducer = storageSyncMetaReducer;
exports.default = localForage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBMkM7QUFDM0MsNkRBQXVEO0FBQ3ZELHVDQUFnRDtBQUNoRCxpREFBMkM7QUFDM0MsMkVBQTJFO0FBRTlELFFBQUEseUJBQXlCLEdBQUcsQ0FBQyxPQUFzQixFQUFFLEVBQUU7SUFDbEUsZ0JBQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUMzQixnQkFBTSxDQUFDLE9BQU8sR0FBRyxzQ0FBaUIsQ0FBQztJQUNuQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQzlCLElBQUcsTUFBTSxLQUFLLGdCQUFnQixFQUFFO1FBQzlCLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDakIsSUFBSSxFQUFVLGNBQWM7WUFDNUIsT0FBTyxFQUFPLEdBQUc7WUFDakIsSUFBSSxFQUFVLE9BQU87WUFDckIsU0FBUyxFQUFLLGVBQWU7WUFDN0IsV0FBVyxFQUFHLHNCQUFzQjtTQUNyQyxDQUFDLENBQUM7UUFDSCxXQUFXLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0MsV0FBVyxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNyRDtTQUFNO1FBQ0wsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUNqQixNQUFNLEVBQVEsTUFBTSxJQUFJLFdBQVcsQ0FBQyxZQUFZO1lBQ2hELElBQUksRUFBVSxjQUFjO1lBQzVCLE9BQU8sRUFBTyxHQUFHO1lBQ2pCLElBQUksRUFBVSxPQUFPO1lBQ3JCLFNBQVMsRUFBSyxlQUFlO1lBQzdCLFdBQVcsRUFBRyxzQkFBc0I7U0FDckMsQ0FBQyxDQUFDO0tBRUo7SUFFRCxPQUFPLFdBQVcsQ0FBQyxJQUFJLEVBQUU7U0FDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ1gsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUNoQixJQUFJLENBQUMsR0FBRyxDQUNOLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQzVELENBQ0YsQ0FBQztJQUNKLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUNuQixNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBa0IsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQzFFLGFBQWEsQ0FBUyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDbEMsT0FBTyxhQUFhLENBQUM7UUFDdkIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ1Asc0NBQWlCLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUM1QyxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztBQUVGLFNBQWdCLHNCQUFzQixDQUNsQyxPQUFZO0lBRWQsT0FBTywwQkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFKRCx3REFJQztBQUVELGtCQUFlLFdBQVcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGxvY2FsRm9yYWdlIGZyb20gJ2xvY2FsZm9yYWdlJztcclxuaW1wb3J0IHttaWRkbGV3YXJlU3RvcmFnZX0gZnJvbSBcIi4vbWlkZGxld2FyZS1zdG9yYWdlXCI7XHJcbmltcG9ydCB7Y29uZmlnLCBTdG9yYWdlQ29uZmlnfSBmcm9tIFwiLi9vcHRpb25zXCI7XHJcbmltcG9ydCB7c3RvcmFnZVN5bmN9IGZyb20gXCIuL3N0b3JhZ2Utc3luY1wiO1xyXG5pbXBvcnQgKiBhcyBzZXNzaW9uU3RvcmFnZURyaXZlciBmcm9tICdsb2NhbGZvcmFnZS1kcml2ZXItc2Vzc2lvbi1zdG9yYWdlJztcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRBbGxEYXRhRnJvbUxvY2FsRm9yYWdlID0gKG9wdGlvbnM6IFN0b3JhZ2VDb25maWcpID0+IHtcclxuICBjb25maWcua2V5cyA9IG9wdGlvbnMua2V5cztcclxuICBjb25maWcuc3RvcmFnZSA9IG1pZGRsZXdhcmVTdG9yYWdlO1xyXG4gIGNvbnN0IGRyaXZlciA9IG9wdGlvbnMuZHJpdmVyO1xyXG4gIGlmKGRyaXZlciA9PT0gJ1NFU1NJT05TVE9SQUdFJykge1xyXG4gICAgbG9jYWxGb3JhZ2UuY29uZmlnKHtcclxuICAgICAgbmFtZSAgICAgICAgOiAnTkdSWCBTdG9yYWdlJyxcclxuICAgICAgdmVyc2lvbiAgICAgOiAxLjAsXHJcbiAgICAgIHNpemUgICAgICAgIDogNDk4MDczNixcclxuICAgICAgc3RvcmVOYW1lICAgOiAna2V5dmFsdWVwYWlycycsXHJcbiAgICAgIGRlc2NyaXB0aW9uIDogJ05HUlggc3RvcmFnZSBwZXJzaXN0J1xyXG4gICAgfSk7XHJcbiAgICBsb2NhbEZvcmFnZS5kZWZpbmVEcml2ZXIoc2Vzc2lvblN0b3JhZ2VEcml2ZXIpO1xyXG4gICAgbG9jYWxGb3JhZ2Uuc2V0RHJpdmVyKHNlc3Npb25TdG9yYWdlRHJpdmVyLl9kcml2ZXIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsb2NhbEZvcmFnZS5jb25maWcoe1xyXG4gICAgICBkcml2ZXIgICAgICA6IGRyaXZlciB8fCBsb2NhbEZvcmFnZS5MT0NBTFNUT1JBR0UsXHJcbiAgICAgIG5hbWUgICAgICAgIDogJ05HUlggU3RvcmFnZScsXHJcbiAgICAgIHZlcnNpb24gICAgIDogMS4wLFxyXG4gICAgICBzaXplICAgICAgICA6IDQ5ODA3MzYsXHJcbiAgICAgIHN0b3JlTmFtZSAgIDogJ2tleXZhbHVlcGFpcnMnLFxyXG4gICAgICBkZXNjcmlwdGlvbiA6ICdOR1JYIHN0b3JhZ2UgcGVyc2lzdCdcclxuICAgIH0pO1xyXG4gIFxyXG4gIH1cclxuICBcclxuICByZXR1cm4gbG9jYWxGb3JhZ2Uua2V5cygpXHJcbiAgICAudGhlbihrZXlzID0+IHtcclxuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxyXG4gICAgICAgIGtleXMubWFwKFxyXG4gICAgICAgICAgKGtleSkgPT4gbG9jYWxGb3JhZ2UuZ2V0SXRlbShrZXkpLnRoZW4oZGF0YSA9PiBba2V5LCBkYXRhXSlcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICB9KVxyXG4gICAgLnRoZW4oZGF0YVdpdGhLZXlzID0+IHtcclxuICAgICAgY29uc3QgZGF0YVN0b3JhZ2UgPSBkYXRhV2l0aEtleXMucmVkdWNlKChwcmV2aW91c1ZhbHVlOiBhbnksIFtrZXksIGRhdGFdKSA9PiB7XHJcbiAgICAgICAgcHJldmlvdXNWYWx1ZVs8c3RyaW5nPmtleV0gPSBkYXRhO1xyXG4gICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlO1xyXG4gICAgICB9LCB7fSk7XHJcbiAgICAgIG1pZGRsZXdhcmVTdG9yYWdlLmRhdGFTdG9yYWdlID0gZGF0YVN0b3JhZ2U7XHJcbiAgICAgIHJldHVybiBkYXRhU3RvcmFnZTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN0b3JhZ2VTeW5jTWV0YVJlZHVjZXIoXHJcbiAgICByZWR1Y2VyOiBhbnlcclxuKTogYW55IHtcclxuICByZXR1cm4gc3RvcmFnZVN5bmMocmVkdWNlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxvY2FsRm9yYWdlO1xyXG4iXX0=