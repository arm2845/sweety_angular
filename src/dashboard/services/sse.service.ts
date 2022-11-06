import {Injectable} from '@angular/core';
/* @ts-ignore */
import { SSE } from "sse.js";

@Injectable({
    providedIn: 'root'
})
export class SseService {
    eventSource: SSE;

    constructor() {
    }

    public getEventSourceWithGet(url: string): SSE {
        return this.buildEventSource(url, 'GET');
    }

    private buildEventSource(url: string, meth: string): SSE {
        const options = this.buildOptions(meth);
        this.eventSource = new SSE(url, options);

        return  this.eventSource;
    }

    private buildOptions(
        meth: string,
    ): {
        method: string;
        headers: string | { Authorization: string };
    } {
        const auth = this.checkAuthorization();
        return {
            method: meth,
            headers: auth !== '' ? { Authorization: auth } : '',
        };
    }

    protected checkAuthorization(): string {
        const authToken = localStorage.getItem('token') || '';
        return 'Bearer ' + authToken;
    }
}
