import React, { useContext } from "react";

import JSZip from 'jszip';


import { HistoryButton, ExportButton, UploadButton, RawJSON } from './TopNav/Button';

import { ProblemDataContext } from '../context/ProblemDataContext';
import { TargetKeyContext } from '../context/TargetKeyContext';
import { EtcContext } from '../context/EtcContext';
import { HistoryContext } from '../context/HistoryContext';
import { PopupContext } from '../context/PopupContext';




export default function TopNav() {

  const { metaData, setMetaData, 
          masterProblemData, setMasterProblemData,
          fileName, setFileName, 
          setTotalProblemNum,
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
      setFileName(file.name);
      setMetaData(jsonData.info);
      setTotalProblemNum(jsonData.questions.length);
      setMasterProblemData(jsonData.questions);

      setJsonFileName(file.name);

      setTargetSubject(jsonData.questions[0].section);

      setTargetProblemNum(jsonData.questions[0].problem_number);
      // setTargetProblemNum(0);


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


  const exportJson = async () => {
    if (!loadStatus) return;

    const safeBase = String(jsonFileName || 'export')
      .replace(/\.(json)$/i, '')
      .replace(/[\\/:*?"<>|]/g, '_');

    // 직렬화된 jsonData만 저장
    const jsonData = {
      info: metaData,
      questions: masterProblemData,
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

    // 파일 저장 (Object URL 방식)
    const BOM = "\uFEFF";
    const blob = new Blob([BOM, jsonString], { type: 'application/json;charset=utf-8' });

    // 날짜 정보
    const _date = new Date().toLocaleString("sv-SE", { timeZone: "Asia/Seoul" });
    const _dateDay = _date.split(' ')[0].replaceAll('-', '')
    const _dateTime = _date.split(' ')[1].replaceAll(':', '')

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${safeBase}+${_dateDay}+${_dateTime}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };
  
  // const exportJson = async () => {
  //   if (!loadStatus) return;

  //   const safeBase = String(jsonFileName || 'export')
  //   .replace(/\.(json)$/i, '')
  //   .replace(/[\\/:*?"<>|]/g, '_');
  

  
  //   // 1) 안전 직렬화
  //   const jsonData = {
  //     // file_name: fileName,
  //     info: metaData,
  //     questions: masterProblemData,
  //   };

  //   const seen = new WeakSet();
  //   let jsonString;
  //   try {
  //     jsonString = JSON.stringify(jsonData, (k, v) => {
  //       if (typeof v === 'object' && v !== null) {
  //         if (seen.has(v)) return '[Circular]';
  //         seen.add(v);
  //       }
  //       return v;
  //     }, 4);
  //   } catch (e) {
  //     console.error('JSON 직렬화 실패:', e);
  //     alert('데이터 직렬화에 실패했습니다.');
  //     return;
  //   }

  //   // 2) history.csv 생성
  //   const historyCsv = history.map(item => 
  //     [
  //       escapeCsv(item.index),
  //       escapeCsv(item.subject),
  //       escapeCsv(item.problem_num),
  //       escapeCsv(item.key),
  //       escapeCsv(item.value_before),
  //       escapeCsv(item.value_after)
  //     ].join(',')
  //   ).join('\n');


  //   const csvHeader = "index,subject,problem_num,key,value_before,value_after\n";
  //   const BOM = "\uFEFF";

  //   const historyCsvBlob = new Blob([BOM, csvHeader, ...historyCsv], { type: 'text/csv;charset=utf-8-sig' });


  //   // 3) zip 생성
  //   const zip = new JSZip();
  //   zip.file(`${safeBase}.json`, jsonString);
  //   zip.file(`${safeBase}_history.csv`, historyCsvBlob);
  //   const zipBlob = await zip.generateAsync({ type: 'blob' });



  //   // const _date = new Date().toISOString()
  //   const _date = new Date().toLocaleString("sv-SE", { timeZone: "Asia/Seoul" });

  //   const _dateDay = _date.split(' ')[0].replaceAll('-', '')
  //   const _dateTime = _date.split(' ')[1].replaceAll(':', '')

  //   const zipUrl = URL.createObjectURL(zipBlob);
  //   const zipA = document.createElement('a');
  //   zipA.href = zipUrl;
  //   zipA.download = `${safeBase}+${_dateDay}+${_dateTime}.zip`;
  //   document.body.appendChild(zipA);
  //   zipA.click();
  //   document.body.removeChild(zipA);
  //   setTimeout(() => URL.revokeObjectURL(zipUrl), 0);

  
  //   // 5) 저장 (Object URL 방식)
  //   // const url = URL.createObjectURL(zipBlob);
  //   // const a = document.createElement('a');
  //   // a.href = url;
  //   // a.download = `${safeBase}.zip`;
  //   // document.body.appendChild(a);
  //   // a.click();
  //   // document.body.removeChild(a);
  //   // setTimeout(() => URL.revokeObjectURL(url), 0);
  // };

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
            <MainTitle fileName={fileName} />

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


        </div>
      </div>
    </div>
  );
}




function MainTitle( { fileName } ) {
  return (
    <div className="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text h-6 w-6 text-primary">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
        <path d="M10 9H8"></path>
        <path d="M16 13H8"></path>
        <path d="M16 17H8"></path>
      </svg>
      <h1 className="text-2xl font-bold">{fileName || '-'}</h1>
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
          <span>{metaData.year || '-'}</span>
      </div>

      <div className="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar h-4 w-4">
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
        </svg>
        <span>{metaData.type || '-'}</span>
      </div>

      <div className="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock h-4 w-4">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>{metaData.subject || '-'}</span>
      </div>
    </div>
  )
}



function escapeCsv(value) {
  if (value == null) return '';
  const str = String(value);
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}