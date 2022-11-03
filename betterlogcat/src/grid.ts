import * as parsing from "./parsing"
import * as lib from "./lib"
import * as processor from "./processor"
// function blah(){
//   document.querySelectorAll(".ag-row-odd.ag-row.ag-row-level-0.ag-row-position-absolute.ag-after-created").forEach(n=>{
//     (n as HTMLElement).addEventListener("mouseenter",e=>{
//       (e.target as HTMLElement).style.height="30px";
//       // (e.target as HTMLElement).style["--ag-line-height"]="30px";
//     });
//     (n as HTMLElement).addEventListener("mouseleave",e=>{
//       (e.target as HTMLElement).style.height="";
//       // (e.target as HTMLElement).style["--ag-line-height"]="";
//     });
//   })
// }

// document.querySelectorAll(".ag-row").forEach(n=>{
//   n.addEventListener("mouseenter",e=>{
//     e.target.style.height="30px";
//     e.target.style["--ag-line-height"]="30px";
//   });
//   n.addEventListener("mouseleave",e=>{
//     e.target.style.height="";
//     e.target.style["--ag-line-height"]="";
//   });
// })



    // setTimeout(()=>{
    //   gridRef?.current?.api.resetRowHeights();
    //   gridRef?.current?.api.sizeColumnsToFit();
    // },2000)
// import {LogObj} from "./parsing";

export interface GridObj{
    datetime: string,
    datecolor?: string,
    level: string,
    tag: string,
    message: string,
    pid:number,
    tid:number,
    domain:string,
}

interface GridRowParams{
    value: any,
    node: GridNodeParams,
}
export interface GridNodeParams{
    data: GridObj,
}


export interface AGGRidColDef{
    field?:string,              // the name of the field as it appears in the rowdata
    pinned?:boolean,            // pins the column to the left side of the grid
    resizable?:boolean,         // allows user to resize the column (and gives it a minimum width of ~50px)
    width?:number,              // specifies the width of the column in pixels (if it is resizable, then it has a minimum width of ~50px)
    filter?:string,             // string that is the name of a built in filter to use (eg 'agTextColumnFilter')
    cellStyle?:{[key:string]:any},
}


/* Default specifications for a column definition */
const defaultColDef:AGGRidColDef = {
    resizable: true,
    filter: 'agTextColumnFilter',
    cellStyle:{
        'textOverflow':'clip',
        'padding':0,
        'whiteSpace':'nowrap',
        'overflow':'hidden',
    }
}

function datetimeCellStyle(params:GridRowParams):{[key:string]:any} {
    let style:{[key:string]:any} = {};
    // let color = lib.timeToColor(new Date(params.value).getTime());
    style['backgroundColor'] = params.node.data.datecolor || "#FF0000" //color;
    return style;
}
function levelCellStyle(params:GridRowParams):{[key:string]:any} {
    if(params.value == 'E'){
        return {
            'color':'red',
        }
    }else{
        return {
            'color':'blue',
        }
    }
}

let initialColumnDefs:AGGRidColDef[] = [
    { field: 'domain', width:50,pinned: true,resizable:false},
    { field: 'datetime',width:140,pinned:true,cellStyle:datetimeCellStyle},
    { field: 'level' ,width:40,pinned:true,resizable:false,cellStyle:levelCellStyle},
    { field: 'pid' ,width:30,resizable:false},
    { field: 'tid' ,width:30,resizable:false},
    // { field: 'uid' ,width:0}, // don't care
    { field: 'tag' ,width:100},
    { field: 'message',width:2400},
];
initialColumnDefs = initialColumnDefs.map(col => {
    return {...defaultColDef, ...col}
})

export let initialColDefs = initialColumnDefs;
export const initialRowData = processor.processText(`07-25 12:17:31.923  5107  7768 D ActivityManager: attachApplicationLocked() app=ProcessRecord{c31657f 16068:com.google.android.marvin.talkback/u0a235} app.isolatedEntryPoint=null instr2=null`)

// [
//     parsing.convertIntermediateLogToGrid(
//         parsing.parseAsLogLine(
//         `07-25 12:17:31.923  5107  7768 D ActivityManager: attachApplicationLocked() app=ProcessRecord{c31657f 16068:com.google.android.marvin.talkback/u0a235} app.isolatedEntryPoint=null instr2=null`
//         ) as parsing.IntermediateLogObj
//     ),
//     // {datetime: "Toyota", level: "Celica", pid: 1,tid:1,tag:"misc",message: "Hello World"},
// ] as GridObj[];


export const ROW_HEIGHT = 20; // in pixels
export const ROW_BUFFER = 10; // # of rows loaded outside of viewport. Smaller is more performant. Default is 10