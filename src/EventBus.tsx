interface IAppCallback{
  (message:any):void;
}

interface IAppDetail{
  detail: any
}

const EventBus = {
  on(event_name:string, callback:Function): void {
    document.addEventListener(event_name, (event: Event) => (callback as IAppCallback)((event as CustomEvent).detail) );
  },
  dispatch(event_name:string, data?:any): void {
    const detail:IAppDetail = { detail: data };
    const dispatch:CustomEvent = new CustomEvent(event_name, detail);
    document.dispatchEvent(dispatch);
  },
  remove(event: string, callback: any): void  {
    document.removeEventListener(event, callback);
  },
};

export default EventBus;
