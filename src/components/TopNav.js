import React, { useContext, useEffect } from "react";

import JSZip from 'jszip';


import { HistoryButton, ExportButton, UploadButton, RawJSON } from './TopNav/Button';

import { ProblemDataContext } from '../context/ProblemDataContext';
import { ProblemCountContext } from '../context/ProblemCountContext';
import { TargetKeyContext } from '../context/TargetKeyContext';
import { EtcContext } from '../context/EtcContext';
import { HistoryContext } from '../context/HistoryContext';
import { PopupContext } from '../context/PopupContext';




export default function TopNav() {

  const { metaData, setMetaData, 
          masterProblemData, setMasterProblemData,
          fileName, setFileName, 
          totalProblemNum, setTotalProblemNum,
          jsonFileName, setJsonFileName } = useContext(ProblemDataContext);

  const { loadStatus, setLoadStatus } = useContext(EtcContext);
  const { setTargetSubject, setTargetProblemNum } = useContext(TargetKeyContext);
  const { history, setHistory } = useContext(HistoryContext);

  const { isPopupOpen, setIsPopupOpen,
          isJsonPopupOpen, setIsJsonPopupOpen } = useContext(PopupContext);


  const loadJson = async (e) => {
    const input = e.target;
    const file = input.files?.[0];

    setHistory([]); // history 초기화
    
    if (!file) {
      // toast('파일을 선택해주세요.');
      return;
    }


    const isJsonName = /\.json$/i.test(file.name);
    const isJsonType = file.type === 'application/json';
    if (!isJsonName && !isJsonType) {
      // toast.error('JSON 파일만 업로드 가능합니다.');
      input.value = '';
      return;
    }

  
    try {
      const text = await file.text();          // ← 간단! (UTF-8 텍스트)
      const jsonData = JSON.parse(text);       // 파싱
      // console.log('lenght', jsonData.data.length);


      // file_name / meta / totalProblemNum
      setFileName(jsonData.file_name);
      setMetaData(jsonData.meta);
      setTotalProblemNum(jsonData.data.length);
      setMasterProblemData(jsonData.data);

      setJsonFileName(file.name);

      setTargetSubject(jsonData.data[0].subject);
      setTargetProblemNum(1);

      setLoadStatus(true);
      
      // setState(jsonData) 등 후속 처리
  
    } catch (err) {
      if (err instanceof SyntaxError) {
        // toast.error('JSON 형식이 올바르지 않습니다.');
        console.error('JSON 파싱 에러:', err);
      } else {
        // toast.error('파일 읽기 중 오류가 발생했습니다.');
        console.error('파일 읽기 에러:', err);
      }
    } finally {
      input.value = ''; // 동일 파일 재업로드 허용
    }
  };

  // const exportJson = async () => {
  //   if (!loadStatus) return;
  
  //   const jsonData = {
  //     file_name: fileName,
  //     meta: metaData,
  //     data: masterProblemData,
  //   };
  
  //   // 1) 안전 직렬화
  //   const seen = new WeakSet();
  //   let jsonString;
  //   try {
  //     jsonString = JSON.stringify(jsonData, (k, v) => {
  //       if (typeof v === 'object' && v !== null) {
  //         if (seen.has(v)) return '__circular__';
  //         seen.add(v);
  //       }
  //       return v;
  //     }, 4);
  //   } catch (e) {
  //     console.error('JSON 직렬화 실패:', e);
  //     alert('데이터 직렬화에 실패했습니다.');
  //     return;
  //   }
  
  //   // 2) Blob 생성
  //   const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
  
  //   // 3) 파일명 정리
  //   const safeBase = String(jsonFileName || 'export')
  //     .replace(/\.(json)$/i, '')
  //     .replace(/[\\/:*?"<>|]/g, '_');
  
  //   // 4) 저장 (Object URL 방식)
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = `${safeBase}.json`;
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   setTimeout(() => URL.revokeObjectURL(url), 0);
  // };

  const exportJson = async () => {
    if (!loadStatus) return;

    const safeBase = String(jsonFileName || 'export')
    .replace(/\.(json)$/i, '')
    .replace(/[\\/:*?"<>|]/g, '_');
  

  
    // 1) 안전 직렬화
    const jsonData = {
      file_name: fileName,
      meta: metaData,
      data: masterProblemData,
    };

    const seen = new WeakSet();
    let jsonString;
    try {
      jsonString = JSON.stringify(jsonData, (k, v) => {
        if (typeof v === 'object' && v !== null) {
          if (seen.has(v)) return '[Circular]';
          seen.add(v);
        }
        return v;
      }, 4);
    } catch (e) {
      console.error('JSON 직렬화 실패:', e);
      alert('데이터 직렬화에 실패했습니다.');
      return;
    }

    // 2) history.csv 생성
    const historyCsv = history.map(item => 
      [
        escapeCsv(item.index),
        escapeCsv(item.subject),
        escapeCsv(item.problem_num),
        escapeCsv(item.key),
        escapeCsv(item.value_before),
        escapeCsv(item.value_after)
      ].join(',')
    ).join('\n');


    const csvHeader = "index,subject,problem_num,key,value_before,value_after\n";
    const BOM = "\uFEFF";

    const historyCsvBlob = new Blob([BOM, csvHeader, ...historyCsv], { type: 'text/csv;charset=utf-8-sig' });
    // const historyCsvUrl = URL.createObjectURL(historyCsvBlob);
    // const historyCsvA = document.createElement('a');
    // historyCsvA.href = historyCsvUrl;
    // historyCsvA.download = `${safeBase}_history.csv`;
    // document.body.appendChild(historyCsvA);
    // historyCsvA.click();
    // document.body.removeChild(historyCsvA);
    // setTimeout(() => URL.revokeObjectURL(historyCsvUrl), 0);


    // 3) zip 생성
    const zip = new JSZip();
    zip.file(`${safeBase}.json`, jsonString);
    zip.file(`${safeBase}_history.csv`, historyCsvBlob);
    const zipBlob = await zip.generateAsync({ type: 'blob' });

    // if ('showSaveFilePicker' in window) {
    //   try {
    //     const fileHandle = await window.showSaveFilePicker({
    //       suggestedName: `${safeBase}++${new Date().toISOString().split('T')[0]}.zip`,
    //       types: [{
    //         description: 'ZIP files',
    //         accept: { 'application/zip': ['.zip'] }
    //       }]
    //     });
        
    //     const writable = await fileHandle.createWritable();
    //     await writable.write(zipBlob);
    //     await writable.close();
        
    //     console.log('파일이 성공적으로 저장되었습니다.');
    //     return;
    //   } catch (error) {
    //     if (error.name !== 'AbortError') {
    //       console.error('File System Access API 사용 중 오류:', error);
    //     }
    //   }
    // }

    // const _date = new Date().toISOString()
    const _date = new Date().toLocaleString("sv-SE", { timeZone: "Asia/Seoul" });

    const _dateDay = _date.split(' ')[0].replaceAll('-', '')
    const _dateTime = _date.split(' ')[1].replaceAll(':', '')

    const zipUrl = URL.createObjectURL(zipBlob);
    const zipA = document.createElement('a');
    zipA.href = zipUrl;
    zipA.download = `${safeBase}+${_dateDay}+${_dateTime}.zip`;
    document.body.appendChild(zipA);
    zipA.click();
    document.body.removeChild(zipA);
    setTimeout(() => URL.revokeObjectURL(zipUrl), 0);

  
    // 5) 저장 (Object URL 방식)
    // const url = URL.createObjectURL(zipBlob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = `${safeBase}.zip`;
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    // setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const handlePopupOpen = () => {
    if (!loadStatus) { return;}
    setIsPopupOpen(!isPopupOpen);
  }

  const handleJsonPopupOpen = () => {
    if (!loadStatus) { return;}
    setIsJsonPopupOpen(!isJsonPopupOpen);
  }

  return (
    <div className="border-b bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <MainTitle metaData={metaData} />

            <div className="flex items-center gap-2">
              {/* <HistoryButton text="History" onClick={() => {}} /> */}
              <HistoryButton text="History" onClick={handlePopupOpen} />

              <input accept=".json" className="hidden" id="file-upload" type="file" onChange={loadJson} />
              <UploadButton text="파일 업로드" />

              <ExportButton text="마킹 다운로드" onClick={exportJson} />

              <RawJSON onClick={handleJsonPopupOpen} />
            </div>
          </div>

          <OrganizerDateDuration metaData={metaData} />

          <CorrectWrongUnresolved />

        </div>
      </div>
    </div>
  );
}




function MainTitle({ metaData }) {
  return (
    <div className="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text h-6 w-6 text-primary">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
        <path d="M10 9H8"></path>
        <path d="M16 13H8"></path>
        <path d="M16 17H8"></path>
      </svg>
      <h1 className="text-2xl font-bold">{metaData.test_type}</h1>
    </div>
  )
}


function OrganizerDateDuration({ metaData }) {
  return (
    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award h-4 w-4">
            <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
            <circle cx="12" cy="8" r="6"></circle>
          </svg>
          <span>{metaData.organizer}</span>
      </div>

      <div className="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar h-4 w-4">
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
        </svg>
        <span>{metaData.date}</span>
      </div>

      <div className="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock h-4 w-4">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>{metaData.duration || '-'}</span>
      </div>
    </div>
  )
}


function CorrectWrongUnresolved() {
  const { correct_count, wrong_count, unresolved_count } = useContext(ProblemCountContext);
  return (
    <div className="flex gap-4 text-sm">
      <div className="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 text-green-600">
          <path d="M20 6 9 17l-5-5"></path>
        </svg>
        <span>정답: {correct_count}</span>
      </div>
      <div className="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-4 w-4 text-red-600">
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
        <span>오답: {wrong_count}</span>
      </div>
      <div className="flex items-center gap-1">
        <span>미해결: {unresolved_count}</span>
      </div>
  </div>
  )
}


function escapeCsv(value) {
  if (value == null) return '';
  const str = String(value);
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}