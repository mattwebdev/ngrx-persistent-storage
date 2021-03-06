"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepmerge = require("deepmerge");
const helpers_1 = require("./helpers");
const options_1 = require("./options");
const stringify = require("json-stringify-safe");
const INIT_ACTION = "@ngrx/store/init";
const UPDATE_ACTION = "@ngrx/store/update-reducers";
function storageSync(reducer) {
    const stateKeys = helpers_1.validateStateKeys(options_1.config.keys);
    const rehydratedState = exports.rehydrateApplicationState(stateKeys, options_1.config.storage);
    return function (state, action) {
        let nextState;
        if ((action.type === INIT_ACTION) && !state) {
            nextState = reducer(state, action);
        }
        else {
            nextState = Object.assign({}, state);
        }
        if (action.type === INIT_ACTION || action.type === UPDATE_ACTION) {
            // @ts-ignore
            const overwriteMerge = (destinationArray, sourceArray) => sourceArray;
            const options = {
                arrayMerge: overwriteMerge,
            };
            nextState = deepmerge(nextState, rehydratedState, options);
        }
        nextState = reducer(nextState, action);
        if (action.type !== INIT_ACTION) {
            exports.syncStateUpdate(nextState, stateKeys, options_1.config.storage);
        }
        return nextState;
    };
}
exports.storageSync = storageSync;
exports.rehydrateApplicationState = (keys, storage) => {
    return keys.reduce((acc, curr) => {
        const key = curr;
        if (storage !== undefined) {
            const stateSlice = storage.getItem(key);
            if (stateSlice) {
                const isObjectRegex = new RegExp("{|\\[");
                let raw = stateSlice;
                if (stateSlice === "null" || isObjectRegex.test(stateSlice.charAt(0))) {
                    raw = JSON.parse(stateSlice);
                }
                return Object.assign({}, acc, { [key]: raw });
            }
        }
        return acc;
    }, {});
};
exports.syncStateUpdate = (state, keys, storage) => {
    keys.forEach((key) => {
        const stateSlice = state[key];
        const replacer = null;
        const space = null;
        if (typeof stateSlice !== "undefined" && storage !== undefined) {
            try {
                storage.setItem(key, typeof stateSlice === "string"
                    ? stateSlice
                    : stringify(stateSlice, replacer, space));
            }
            catch (e) {
                console.warn("Unable to save state to localStorage:", e);
            }
        }
        else if (typeof stateSlice === "undefined") {
            try {
                storage.removeItem(key);
            }
            catch (e) {
                console.warn(`Exception on removing/cleaning undefined '${key}' state`, e);
            }
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS1zeW5jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3N0b3JhZ2Utc3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF1QztBQUN2Qyx1Q0FBNEM7QUFDNUMsdUNBQWlDO0FBRWpDLGlEQUFrRDtBQUNsRCxNQUFNLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQztBQUN2QyxNQUFNLGFBQWEsR0FBRyw2QkFBNkIsQ0FBQztBQUVwRCxTQUFnQixXQUFXLENBQUMsT0FBWTtJQUNwQyxNQUFNLFNBQVMsR0FBRywyQkFBaUIsQ0FBQyxnQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELE1BQU0sZUFBZSxHQUFHLGlDQUF5QixDQUFDLFNBQVMsRUFBRSxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTdFLE9BQU8sVUFBUyxLQUFVLEVBQUUsTUFBVztRQUNuQyxJQUFJLFNBQVMsQ0FBQztRQUVkLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3pDLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3RDO2FBQU07WUFDSCxTQUFTLHFCQUFPLEtBQUssQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLGFBQWEsRUFBRTtZQUM5RCxhQUFhO1lBQ2IsTUFBTSxjQUFjLEdBQUcsQ0FBQyxnQkFBcUIsRUFBRSxXQUFnQixFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDaEYsTUFBTSxPQUFPLEdBQXNCO2dCQUMvQixVQUFVLEVBQUUsY0FBYzthQUM3QixDQUFDO1lBQ0YsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLEVBQUUsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzlEO1FBRUQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFdkMsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTtZQUM3Qix1QkFBZSxDQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1QsZ0JBQU0sQ0FBQyxPQUFPLENBQ2pCLENBQUM7U0FDTDtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUMsQ0FBQztBQUNOLENBQUM7QUFqQ0Qsa0NBaUNDO0FBRVksUUFBQSx5QkFBeUIsR0FBRyxDQUNyQyxJQUFXLEVBQ1gsT0FBZ0IsRUFDbEIsRUFBRTtJQUNBLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUM3QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFFakIsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ3ZCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEMsSUFBSSxVQUFVLEVBQUU7Z0JBQ1osTUFBTSxhQUFhLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzFDLElBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQztnQkFFckIsSUFBSSxVQUFVLEtBQUssTUFBTSxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNuRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDaEM7Z0JBRUQseUJBQVcsR0FBRyxJQUNWLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFFO2FBQ25CO1NBQ0o7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNYLENBQUMsQ0FBQztBQUVXLFFBQUEsZUFBZSxHQUFHLENBQzNCLEtBQVUsRUFDVixJQUFXLEVBQ1gsT0FBZ0IsRUFDbEIsRUFBRTtJQUNBLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNqQixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsTUFBTSxRQUFRLEdBQVEsSUFBSSxDQUFDO1FBQzNCLE1BQU0sS0FBSyxHQUFRLElBQUksQ0FBQztRQUV4QixJQUFJLE9BQU8sVUFBVSxLQUFLLFdBQVcsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQzVELElBQUk7Z0JBQ0EsT0FBTyxDQUFDLE9BQU8sQ0FDWCxHQUFHLEVBQ0gsT0FBTyxVQUFVLEtBQUssUUFBUTtvQkFDMUIsQ0FBQyxDQUFDLFVBQVU7b0JBQ1osQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUMvQyxDQUFDO2FBQ0w7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDUixPQUFPLENBQUMsSUFBSSxDQUFDLHVDQUF1QyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzVEO1NBQ0o7YUFBTSxJQUFJLE9BQU8sVUFBVSxLQUFLLFdBQVcsRUFBRTtZQUMxQyxJQUFJO2dCQUNBLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDM0I7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDUixPQUFPLENBQUMsSUFBSSxDQUNSLDZDQUE2QyxHQUFHLFNBQVMsRUFDekQsQ0FBQyxDQUNKLENBQUM7YUFDTDtTQUNKO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBkZWVwbWVyZ2UgZnJvbSBcImRlZXBtZXJnZVwiO1xyXG5pbXBvcnQge3ZhbGlkYXRlU3RhdGVLZXlzfSBmcm9tIFwiLi9oZWxwZXJzXCI7XHJcbmltcG9ydCB7Y29uZmlnfSBmcm9tIFwiLi9vcHRpb25zXCI7XHJcblxyXG5pbXBvcnQgc3RyaW5naWZ5ID0gcmVxdWlyZSgnanNvbi1zdHJpbmdpZnktc2FmZScpO1xyXG5jb25zdCBJTklUX0FDVElPTiA9IFwiQG5ncngvc3RvcmUvaW5pdFwiO1xyXG5jb25zdCBVUERBVEVfQUNUSU9OID0gXCJAbmdyeC9zdG9yZS91cGRhdGUtcmVkdWNlcnNcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdG9yYWdlU3luYyhyZWR1Y2VyOiBhbnkpIHtcclxuICAgIGNvbnN0IHN0YXRlS2V5cyA9IHZhbGlkYXRlU3RhdGVLZXlzKGNvbmZpZy5rZXlzKTtcclxuICAgIGNvbnN0IHJlaHlkcmF0ZWRTdGF0ZSA9IHJlaHlkcmF0ZUFwcGxpY2F0aW9uU3RhdGUoc3RhdGVLZXlzLCBjb25maWcuc3RvcmFnZSk7XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlOiBhbnksIGFjdGlvbjogYW55KSB7XHJcbiAgICAgICAgbGV0IG5leHRTdGF0ZTtcclxuXHJcbiAgICAgICAgaWYgKChhY3Rpb24udHlwZSA9PT0gSU5JVF9BQ1RJT04pICYmICFzdGF0ZSkge1xyXG4gICAgICAgICAgICBuZXh0U3RhdGUgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5leHRTdGF0ZSA9IHsuLi5zdGF0ZX07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gSU5JVF9BQ1RJT04gfHwgYWN0aW9uLnR5cGUgPT09IFVQREFURV9BQ1RJT04pIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBjb25zdCBvdmVyd3JpdGVNZXJnZSA9IChkZXN0aW5hdGlvbkFycmF5OiBhbnksIHNvdXJjZUFycmF5OiBhbnkpID0+IHNvdXJjZUFycmF5O1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zOiBkZWVwbWVyZ2UuT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIGFycmF5TWVyZ2U6IG92ZXJ3cml0ZU1lcmdlLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBuZXh0U3RhdGUgPSBkZWVwbWVyZ2UobmV4dFN0YXRlLCByZWh5ZHJhdGVkU3RhdGUsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV4dFN0YXRlID0gcmVkdWNlcihuZXh0U3RhdGUsIGFjdGlvbik7XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24udHlwZSAhPT0gSU5JVF9BQ1RJT04pIHtcclxuICAgICAgICAgICAgc3luY1N0YXRlVXBkYXRlKFxyXG4gICAgICAgICAgICAgICAgbmV4dFN0YXRlLFxyXG4gICAgICAgICAgICAgICAgc3RhdGVLZXlzLFxyXG4gICAgICAgICAgICAgICAgY29uZmlnLnN0b3JhZ2UsXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV4dFN0YXRlO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlaHlkcmF0ZUFwcGxpY2F0aW9uU3RhdGUgPSAoXHJcbiAgICBrZXlzOiBhbnlbXSxcclxuICAgIHN0b3JhZ2U6IFN0b3JhZ2UsXHJcbikgPT4ge1xyXG4gICAgcmV0dXJuIGtleXMucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcclxuICAgICAgICBjb25zdCBrZXkgPSBjdXJyO1xyXG5cclxuICAgICAgICBpZiAoc3RvcmFnZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlU2xpY2UgPSBzdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgaWYgKHN0YXRlU2xpY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzT2JqZWN0UmVnZXggPSBuZXcgUmVnRXhwKFwie3xcXFxcW1wiKTtcclxuICAgICAgICAgICAgICAgIGxldCByYXcgPSBzdGF0ZVNsaWNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZVNsaWNlID09PSBcIm51bGxcIiB8fCBpc09iamVjdFJlZ2V4LnRlc3Qoc3RhdGVTbGljZS5jaGFyQXQoMCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmF3ID0gSlNPTi5wYXJzZShzdGF0ZVNsaWNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gey4uLmFjYyxcclxuICAgICAgICAgICAgICAgICAgICBba2V5XTogcmF3fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwge30pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHN5bmNTdGF0ZVVwZGF0ZSA9IChcclxuICAgIHN0YXRlOiBhbnksXHJcbiAgICBrZXlzOiBhbnlbXSxcclxuICAgIHN0b3JhZ2U6IFN0b3JhZ2UsXHJcbikgPT4ge1xyXG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICBjb25zdCBzdGF0ZVNsaWNlID0gc3RhdGVba2V5XTtcclxuICAgICAgICBjb25zdCByZXBsYWNlcjogYW55ID0gbnVsbDtcclxuICAgICAgICBjb25zdCBzcGFjZTogYW55ID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZVNsaWNlICE9PSBcInVuZGVmaW5lZFwiICYmIHN0b3JhZ2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKFxyXG4gICAgICAgICAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygc3RhdGVTbGljZSA9PT0gXCJzdHJpbmdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHN0YXRlU2xpY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBzdHJpbmdpZnkoc3RhdGVTbGljZSwgcmVwbGFjZXIsIHNwYWNlKSxcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBzYXZlIHN0YXRlIHRvIGxvY2FsU3RvcmFnZTpcIiwgZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzdGF0ZVNsaWNlID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgICAgICAgICAgICAgIGBFeGNlcHRpb24gb24gcmVtb3ZpbmcvY2xlYW5pbmcgdW5kZWZpbmVkICcke2tleX0nIHN0YXRlYCxcclxuICAgICAgICAgICAgICAgICAgICBlLFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG4iXX0=