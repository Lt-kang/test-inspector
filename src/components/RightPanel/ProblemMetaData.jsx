function ImageType({title, file_name, img_type=false}) {
    return (
      <div class="mt-4">
        <h4 class="font-semibold mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-image h-4 w-4">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
            <circle cx="9" cy="9" r="2"></circle>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
          </svg>
          {title}
        </h4>
        <div class="space-y-2">
          <div class="p-3 bg-muted rounded-lg text-sm">
            <div class="grid grid-cols-2 gap-2">
              <div>
                {/* <span class="font-medium">파일명:</span> {problem_data.image_complete[0].image_filename} */}
                <span class="font-medium">파일명:</span> {file_name}
              </div>
              {
                img_type && (
                  <div>
                    <span class="font-medium">타입:</span> {img_type}
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  
  
export default function ProblemMetaData({problemInfoShow, problem_data}) {
    if (!problemInfoShow) {return ;}
    return (
  <div class="rounded-lg border text-card-foreground shadow-sm bg-muted/50 mb-6">
    <div class="flex flex-col space-y-1.5 p-6">
      <div class="font-semibold tracking-tight text-lg">문제 메타데이터</div>
    </div>
    <div class="p-6 pt-0 space-y-4">
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span class="font-medium">학년:</span> {problem_data.grade}
        </div>
        <div>
          <span class="font-medium">과목:</span> {problem_data.subject}
        </div>
        <div>
          <span class="font-medium">페이지:</span> {problem_data.page_num}
        </div>
        <div>
          <span class="font-medium">문제번호:</span> {problem_data.problem_num}
        </div>
        <div>
          <span class="font-medium">답안유형:</span> {problem_data.answer_type}
        </div>
        <div>
          <span class="font-medium">배점:</span> {problem_data.score}점
        </div>
      </div>
      <ImageType title="완전 이미지" 
                 file_name={problem_data.image_complete[0].image_filename} 
                 img_type={problem_data.image_complete[0].image_type} />
  
      {(problem_data.image_partial || []).length > 0 && (
        <ImageType title="합성 이미지" 
                  file_name={problem_data.image_partial[0].image_filename} />
      )}
  
      {(problem_data.image_figure || []).length > 0 && (
        <ImageType title="도형 이미지" 
                  file_name={problem_data.image_figure[0].image_filename} 
                  img_type={problem_data.image_figure[0].image_type} />
      )}
    </div>
  </div>
    )
  }