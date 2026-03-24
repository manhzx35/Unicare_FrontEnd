export interface TestOption {
  text: string;
  score: number;
}

export interface TestQuestion {
  question: string;
  subtitle?: string;
  multipleChoice?: boolean;
  options: TestOption[];
}

export interface TestScale {
  min: number;
  max: number;
  label: string;
  description: string;
}

export interface PsychologicalTest {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  questions: TestQuestion[];
  scales: TestScale[];
}

export const psychologicalTests: PsychologicalTest[] = [
  {
    id: 'tram-cam',
    title: 'Chẩn Đoán Trầm Cảm (PHQ-9)',
    shortTitle: 'Test trầm cảm',
    subtitle: 'Dựa trên thang đo PHQ-9. Hãy trả lời trung thực về tình trạng của bạn trong 2 tuần qua.',
    description: 'BẠN CÓ THƯỜNG XUYÊN BỊ LÀM PHIỀN BỞI NHỮNG VẤN ĐỀ SAU ĐÂY TRONG SUỐT 2 TUẦN QUA KHÔNG?',
    questions: [
      {
        question: 'Ít quan tâm hoặc niềm vui khi làm mọi việc?',
        options: [
          { text: 'Không bao giờ', score: 0 },
          { text: 'Vài ngày', score: 1 },
          { text: 'Hơn nửa số ngày', score: 2 },
          { text: 'Gần như mỗi ngày', score: 3 },
        ],
      },
      {
        question: 'Cảm thấy buồn bã, chán nản, hoặc tuyệt vọng?',
        options: [
          { text: 'Không bao giờ', score: 0 },
          { text: 'Vài ngày', score: 1 },
          { text: 'Hơn nửa số ngày', score: 2 },
          { text: 'Gần như mỗi ngày', score: 3 },
        ],
      },
      {
        question: 'Khó ngủ, ngủ không sâu giấc, hoặc ngủ quá nhiều?',
        options: [
          { text: 'Không bao giờ', score: 0 },
          { text: 'Vài ngày', score: 1 },
          { text: 'Hơn nửa số ngày', score: 2 },
          { text: 'Gần như mỗi ngày', score: 3 },
        ],
      },
      {
        question: 'Cảm thấy mệt mỏi hoặc có rất ít năng lượng?',
        options: [
          { text: 'Không bao giờ', score: 0 },
          { text: 'Vài ngày', score: 1 },
          { text: 'Hơn nửa số ngày', score: 2 },
          { text: 'Gần như mỗi ngày', score: 3 },
        ],
      },
      {
        question: 'Chán ăn hoặc ăn quá nhiều?',
        options: [
          { text: 'Không bao giờ', score: 0 },
          { text: 'Vài ngày', score: 1 },
          { text: 'Hơn nửa số ngày', score: 2 },
          { text: 'Gần như mỗi ngày', score: 3 },
        ],
      },
      {
        question: 'Cảm thấy tồi tệ về bản thân — hoặc cảm thấy mình là kẻ thất bại hoặc đã làm bản thân/gia đình thất vọng?',
        options: [
          { text: 'Không bao giờ', score: 0 },
          { text: 'Vài ngày', score: 1 },
          { text: 'Hơn nửa số ngày', score: 2 },
          { text: 'Gần như mỗi ngày', score: 3 },
        ],
      },
      {
        question: 'Khó tập trung vào mọi việc, chẳng hạn như đọc báo hoặc xem tivi?',
        options: [
          { text: 'Không bao giờ', score: 0 },
          { text: 'Vài ngày', score: 1 },
          { text: 'Hơn nửa số ngày', score: 2 },
          { text: 'Gần như mỗi ngày', score: 3 },
        ],
      },
      {
        question: 'Di chuyển hoặc nói chậm chạp đến mức người khác có thể nhận ra? Hoặc ngược lại — bồn chồn, bứt rứt và di chuyển quá nhiều?',
        options: [
          { text: 'Không bao giờ', score: 0 },
          { text: 'Vài ngày', score: 1 },
          { text: 'Hơn nửa số ngày', score: 2 },
          { text: 'Gần như mỗi ngày', score: 3 },
        ],
      },
      {
        question: 'Có ý nghĩ rằng bạn thà chết đi cho xong, hoặc muốn tự làm hại bản thân theo cách nào đó?',
        options: [
          { text: 'Không bao giờ', score: 0 },
          { text: 'Vài ngày', score: 1 },
          { text: 'Hơn nửa số ngày', score: 2 },
          { text: 'Gần như mỗi ngày', score: 3 },
        ],
      },
    ],
    scales: [
      { min: 0, max: 4, label: 'Bình thường', description: 'Hiện tại, trạng thái tinh thần của bạn khá ổn định và tích cực. Bạn không có dấu hiệu trầm cảm hoặc chúng chỉ xuất hiện ở mức độ rất nhẹ, không đáng kể. Tuy nhiên, sức khỏe tinh thần luôn cần được chăm sóc mỗi ngày. Hãy duy trì các thói quen lành mạnh như tập thể dục, ngủ đủ giấc và dành thời gian cho những sở thích cá nhân để tiếp tục giữ vững năng lượng này nhé.' },
      { min: 5, max: 9, label: 'Trầm cảm nhẹ', description: 'Kết quả cho thấy bạn đang trải qua một số dấu hiệu trầm cảm ở mức độ nhẹ. Những áp lực hoặc cảm xúc buồn chán có thể thỉnh thoảng xuất hiện, khiến bạn cảm thấy uể oải hơn bình thường. Mặc dù chưa ở mức đáng lo ngại, nhưng đây là lời nhắc nhở từ cơ thể rằng bạn cần được nghỉ ngơi. Hãy cho phép bản thân chậm lại một chút, chia sẻ những khó khăn với người bạn tin tưởng và tập trung vào việc tự chăm sóc bản thân (self-care).' },
      { min: 10, max: 14, label: 'Trầm cảm vừa', description: 'Ở mức điểm này, các triệu chứng trầm cảm đang bộc lộ rõ rệt và bắt đầu tạo ra những ảnh hưởng nhất định đến nhịp sống hàng ngày của bạn. Bạn có thể thường xuyên cảm thấy cạn kiệt năng lượng, mất đi niềm vui hay khó khăn trong việc duy trì sự tập trung. Đừng cố gắng gồng gánh mọi thứ một mình. Việc trò chuyện với một chuyên gia tâm lý ở giai đoạn này sẽ mang lại cho bạn những góc nhìn và công cụ hữu ích để quản lý cảm xúc tốt hơn.' },
      { min: 15, max: 19, label: 'Trầm cảm nặng trung bình', description: 'Kết quả chỉ ra rằng bạn đang phải đối mặt với tình trạng trầm cảm ở mức độ khá nặng. Sự mệt mỏi về cả thể chất lẫn tinh thần hiện đang tạo ra những rào cản lớn trong công việc, học tập và các mối quan hệ xã hội. Đây là giai đoạn mà sự nỗ lực tự thân đơn lẻ thường là chưa đủ. Chúng tôi đặc biệt khuyên bạn nên sớm tìm đến sự hỗ trợ của các chuyên gia hoặc bác sĩ tâm thần để được tham vấn và có hướng can thiệp kịp thời.' },
      { min: 20, max: 27, label: 'Trầm cảm nặng', description: 'Kết quả cho thấy bạn có thể đang phải chịu đựng những triệu chứng trầm cảm rất nặng nề, khiến mọi hoạt động sinh hoạt, giao tiếp và duy trì các mối quan hệ trở nên vô cùng khó khăn và kiệt sức. Cảm giác tuyệt vọng có thể đang bủa vây lấy bạn.\n\nTuy nhiên, xin bạn nhớ rằng kết quả này không phải là bản án khép lại mọi thứ, mà là một tín hiệu khẩn cấp cho thấy bạn đang rất cần được giúp đỡ. Đừng ngần ngại hay ôm lấy tổn thương một mình, hãy kết nối với chuyên gia tâm lý hoặc bác sĩ tâm thần ngay lúc này. Luôn có những người sẵn lòng và có đủ chuyên môn để kéo bạn ra khỏi vùng tối này.' }
    ]
  },
  {
    id: 'lo-au',
    title: 'Kiểm tra lo âu nhanh (GAD-7)',
    shortTitle: 'Test rối loạn lo âu',
    subtitle: 'Dựa trên thang đo GAD-7. Hãy trả lời trung thực về tình trạng của bạn trong 2 tuần qua.',
    description: 'TRONG 2 TUẦN QUA, BẠN CÓ THƯỜNG XUYÊN BỊ LÀM PHIỀN BỞI:',
    questions: [
      {
        question: 'Cảm thấy lo lắng, bồn chồn hoặc căng thẳng?',
        options: [
          { text: 'Không bao giờ', score: 0 },
          { text: 'Vài ngày', score: 1 },
          { text: 'Hơn một nửa số ngày', score: 2 },
          { text: 'Hầu như mỗi ngày', score: 3 },
        ]
      },
      {
        question: 'Không thể ngừng hoặc kiểm soát được sự lo lắng?',
        options: [
          { text: 'Không bao giờ', score: 0 },
          { text: 'Vài ngày', score: 1 },
          { text: 'Hơn một nửa số ngày', score: 2 },
          { text: 'Hầu như mỗi ngày', score: 3 },
        ]
      },
      {
        question: 'Lo lắng quá nhiều về những điều khác nhau?',
        options: [
          { text: 'Không bao giờ', score: 0 },
          { text: 'Vài ngày', score: 1 },
          { text: 'Hơn một nửa số ngày', score: 2 },
          { text: 'Hầu như mỗi ngày', score: 3 },
        ]
      },
      {
        question: 'Khó thư giãn?',
        options: [
          { text: 'Không bao giờ', score: 0 },
          { text: 'Vài ngày', score: 1 },
          { text: 'Hơn một nửa số ngày', score: 2 },
          { text: 'Hầu như mỗi ngày', score: 3 },
        ]
      },
      {
        question: 'Bồn chồn đến mức khó có thể ngồi yên?',
        options: [
          { text: 'Không bao giờ', score: 0 },
          { text: 'Vài ngày', score: 1 },
          { text: 'Hơn một nửa số ngày', score: 2 },
          { text: 'Hầu như mỗi ngày', score: 3 },
        ]
      },
      {
        question: 'Trở nên dễ bị kích động hoặc cáu kỉnh?',
        options: [
          { text: 'Không bao giờ', score: 0 },
          { text: 'Vài ngày', score: 1 },
          { text: 'Hơn một nửa số ngày', score: 2 },
          { text: 'Hầu như mỗi ngày', score: 3 },
        ]
      },
      {
        question: 'Cảm thấy sợ hãi như có điều gì đó khủng khiếp sắp xảy ra?',
        options: [
          { text: 'Không bao giờ', score: 0 },
          { text: 'Vài ngày', score: 1 },
          { text: 'Hơn một nửa số ngày', score: 2 },
          { text: 'Hầu như mỗi ngày', score: 3 },
        ]
      }
    ],
    scales: [
      { min: 0, max: 4, label: 'Bình thường', description: 'Mức độ lo âu của bạn hoàn toàn nằm trong ranh giới an toàn. Những lo lắng nhỏ nhặt (nếu có) phản ánh phản ứng bình thường của con người trước các áp lực cuộc sống và bạn đang kiểm soát chúng rất hiệu quả. Hãy tiếp tục duy trì trạng thái tích cực này.' },
      { min: 5, max: 9, label: 'Lo âu nhẹ', description: 'Bạn đang có những biểu hiện lo âu nhẹ. Dù bạn vẫn đang làm chủ được cuộc sống và công việc, nhưng đôi khi những bộn bề suy nghĩ có thể khiến bạn cảm thấy căng thẳng hoặc khó thư giãn. Bạn có thể thử kết hợp các bài tập hít thở sâu, chánh niệm hoặc đơn giản là dành vài phút mỗi ngày "ngắt kết nối" kỹ thuật số để thả lỏng tâm trí.' },
      { min: 10, max: 14, label: 'Lo âu vừa', description: 'Sự lo âu của bạn không còn chỉ là thoáng qua mà đang lớn dần, tạo thêm áp lực và đôi khi khiến bạn cảm thấy kiệt sức, mất ngủ hoặc khó kiểm soát cảm xúc. Đây là lúc bạn cần nhìn nhận lại khối lượng công việc và thiết lập ranh giới cho bản thân. Trò chuyện sâu với một người bạn biết lắng nghe hoặc chủ động tham vấn cùng chuyên gia tâm lý sẽ giúp bạn "xả" được những gánh nặng này kịp thời.' },
      { min: 15, max: 21, label: 'Lo âu nặng', description: 'Mức độ lo lắng của bạn đang ở tình trạng báo động và hiển nhiên nó đang bào mòn sức khỏe thể chất lẫn tinh thần của bạn mỗi ngày. Bạn có thể thường xuyên rơi vào trạng thái bồn chồn, hoảng sợ vô cớ hoặc cảm thấy mọi thứ quá sức chịu đựng. Xin đừng coi nhẹ sức khỏe của mình. Sự can thiệp chuyên môn từ các bác sĩ hoặc nhà trị liệu tâm lý lúc này là vô cùng cần thiết để giúp bạn tìm ra nguyên nhân cốt lõi và hướng dẫn bạn cách vượt qua các cơn hoảng loạn.' }
    ]
  },
  {
    id: 'luong-cuc',
    title: 'Kiểm tra Rối Loạn Lưỡng Cực (MDQ)',
    shortTitle: 'Test rối loạn lưỡng cực',
    subtitle: 'Kháo sát các biểu hiện bất thường hưng - trầm cảm.',
    description: 'ĐÃ TỪNG CÓ GIAI ĐOẠN NÀO BẠN CẢM THẤY MÌNH KHÔNG GIỐNG BÌNH THƯỜNG VÀ:',
    questions: [
      {
        question: 'Bạn thấy vui vẻ hay phấn khích tới mức người khác cảm thấy bạn không giống thường lệ hay phấn khích tới mức gặp rắc rối?',
        options: [ { text: 'Không', score: 0 }, { text: 'Có', score: 1 } ]
      },
      {
        question: 'Bạn thấy khó chịu tới mức quát mắng người khác, hay gây sự đánh nhau, cãi nhau?',
        options: [ { text: 'Không', score: 0 }, { text: 'Có', score: 1 } ]
      },
      {
        question: 'Bạn thấy tự tin nhiều hơn bình thường?',
        options: [ { text: 'Không', score: 0 }, { text: 'Có', score: 1 } ]
      },
      {
        question: 'Bạn ngủ ít hơn bình thường nhiều nhưng thấy không quá mệt?',
        options: [ { text: 'Không', score: 0 }, { text: 'Có', score: 1 } ]
      },
      {
        question: 'Bạn nói nhiều hơn hoặc nhanh hơn bình thường?',
        options: [ { text: 'Không', score: 0 }, { text: 'Có', score: 1 } ]
      },
      {
        question: 'Bạn có cảm giác ý nghĩ tới dồn dập hay không nghĩ chậm lại được?',
        options: [ { text: 'Không', score: 0 }, { text: 'Có', score: 1 } ]
      },
      {
        question: 'Bạn rất dễ bị phân tâm bởi những thứ xung quanh tới mức khó tập trung hay đi đúng hướng?',
        options: [ { text: 'Không', score: 0 }, { text: 'Có', score: 1 } ]
      },
      {
        question: 'Bạn thấy mình nhiều năng lượng hơn bình thường?',
        options: [ { text: 'Không', score: 0 }, { text: 'Có', score: 1 } ]
      },
      {
        question: 'Bạn hăng hái giao tiếp hay hào hứng hơn bình thường, ví dụ như gọi điện cho bạn bè giữa đêm khuya?',
        options: [ { text: 'Không', score: 0 }, { text: 'Có', score: 1 } ]
      },
      {
        question: 'Bạn có hứng thú với tình dục hơn bình thường?',
        options: [ { text: 'Không', score: 0 }, { text: 'Có', score: 1 } ]
      },
      {
        question: 'Bạn làm những điều bất thường, hay những điều người khác coi là quá trớn, dại dột, hay liều lĩnh?',
        options: [ { text: 'Không', score: 0 }, { text: 'Có', score: 1 } ]
      },
      {
        question: 'Việc tiêu tiền khiến bạn hoặc gia đình gặp rắc rối?',
        options: [ { text: 'Không', score: 0 }, { text: 'Có', score: 1 } ]
      },
      {
        question: 'Nếu bạn chọn CÓ ở bất cứ mục nào phía trên, đã từng có giai đoạn nào nhiều mục xảy ra cùng một lúc chưa?',
        options: [ { text: 'Không', score: 0 }, { text: 'Có', score: 1 } ]
      },
      {
        question: 'Những mục trên gây cho bạn vấn đề như thế nào (Ví dụ: không làm việc được, gặp rắc rối gia đình, pháp luật, đánh nhau)?',
        options: [ 
          { text: 'Không Vấn Đề', score: 0 }, 
          { text: 'Vấn Đề Nhỏ', score: 1 },
          { text: 'Vấn Đề Trung Bình', score: 2 },
          { text: 'Vấn Đề Nghiêm Trọng', score: 3 }
        ]
      },
      {
        question: 'Bạn có người thân quan hệ huyết thống nào mắc bệnh hưng - trầm cảm hoặc rối loạn lưỡng cực không? (VD: Con cái, anh chị em, bố mẹ, ông bà, cô dì chú bác)',
        options: [ { text: 'Không', score: 0 }, { text: 'Có', score: 1 } ]
      },
      {
        question: 'Chuyên gia y tế đã từng chẩn đoán bạn mắc bệnh hưng - trầm cảm hay rối loạn lưỡng cực chưa?',
        options: [ { text: 'Không', score: 0 }, { text: 'Có', score: 1 } ]
      }
    ],
    scales: [
      { min: 0, max: 6, label: 'Nguy cơ thấp', description: 'Hệ thống trạng thái cảm xúc của bạn nhìn chung là bình thường và tương đối vững vàng. Bạn ít có khả năng đang mắc chứng rối loạn lưỡng cực. Nếu có thỉnh thoảng cảm thấy buồn vui thất thường, đó có thể chỉ là phản ánh tự nhiên đối với những sự kiện cụ thể trong cuộc đời bạn.' },
      { min: 7, max: 50, label: 'Nguy cơ đáng kể', description: 'Dựa trên câu trả lời của bạn, có dấu hiệu rõ rệt cho thấy sự tồn tại của các đợt thay đổi sắc thái cảm xúc bất thường (đặc trưng của dạng rối loạn hưng trầm cảm). Sự cực đoan giữa các trạng thái này rất dễ gây ra hệ lụy lớn về mặt tài chính, các mối quan hệ xã hội hoặc suy kiệt tinh thần trầm trọng.\n\nSàng lọc này chủ yếu để nâng cao nhận thức, không thay thế cho chẩn đoán y khoa. Hãy liên hệ ngay với một bác sĩ tâm thần hoặc nhà tham vấn tâm lý để đánh giá chuyên sâu và lên kế hoạch trị liệu nếu cần thiết.' }
    ]
  },
  {
    id: 'thanh-thieu-nien',
    title: 'Test Sức Khỏe Tâm Thần Thanh Thiếu Niên',
    shortTitle: 'Test sức khỏe tâm thần T.T.N',
    subtitle: 'Đánh giá các vấn đề về hành vi và cảm xúc thanh thiếu niên.',
    description: 'TRONG CUỘC SỐNG HÀNG NGÀY, EM CÓ THƯỜNG XUYÊN:',
    questions: [
      { question: '1. Than bị đau nhức', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '2. Ở một mình nhiều hơn', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '3. Dễ bị mệt mỏi, yếu sức', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '4. Cựa quậy, đứng ngồi không yên', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '5. Có vấn đề với thầy cô giáo', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '6. Không thích đi học', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '7. Hành động như thể chạy bằng máy', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '8. Mơ mộng quá nhiều', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '9. Dễ bị phân tâm', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '10. Sợ những hoàn cảnh mới', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '11. Cảm thấy buồn, không vui', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '12. Thấy khó chịu, giận dữ', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '13. Cảm thấy tuyệt vọng', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '14. Kém tập trung', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '15. Ít thích bạn bè', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '16. Đánh nhau với những em nhỏ khác', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '17. Nghỉ học', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '18. Tụt điểm trong lớp', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '19. Chán bản thân', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '20. Đi bác sĩ mà bác sĩ không tìm ra căn bệnh', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '21. Khó ngủ', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '22. Lo lắng nhiều', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '23. Muốn ở cùng với ba mẹ nhiều hơn trước đây', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '24. Cảm thấy mình tệ hại', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '25. Làm những việc mang tính rủi ro không cần thiết', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '26. Thường bị tổn thương', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '27. Có vẻ kém vui', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '28. Hành động trẻ con hơn những đứa trẻ đồng trang lứa', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '29. Không nghe các nội quy', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '30. Không biểu lộ cảm xúc', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '31. Không hiểu cảm xúc của người khác', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '32. Chọc ghẹo người khác', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '33. Đổ lỗi cho người khác', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '34. Lấy đồ của người khác', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] },
      { question: '35. Không chịu chia sẻ', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Thường Xuyên', score: 2 }] }
    ],
    scales: [
      { min: 0, max: 27, label: 'Khá sáng sủa', description: 'Tâm lý thanh thiếu niên ở trạng thái bình thường tích cực. Bạn/Em đang thích nghi khá tốt với những biến đổi tâm sinh lý của lứa tuổi, cũng như kiểm soát tốt các mối quan hệ bạn bè, gia đình, nhà trường. Duy trì lối sống lành mạnh và tự tin chia sẻ những suy nghĩ của mình với những người bạn tin tưởng nhé.' },
      { min: 28, max: 100, label: 'Cần chú ý đặc biệt (Lâm sàng)', description: 'Mức độ gặp khó khăn trong tâm lý, cảm xúc hay hành vi xã hội đang ở mức cần được quan tâm kịp thời. Sự kìm nén hoặc bế tắc không chỉ rào cản quá trình học tập mà có thể để lại sang chấn sâu đậm trên hành trình trưởng thành.\n\nNếu em là thanh thiếu niên thực hiện bài test, đừng ngại chia sẻ điều này với cha mẹ, thầy cô giáo hoặc một người lớn an toàn mà em tin cậy. Nếu quý vị là phụ huynh, hãy chủ động lắng nghe tâm tư của con cái không phán xét, và tìm kiếm sự hỗ trợ chuyên môn từ chuyên gia tâm lý học đường.' }
    ]
  },
  {
    id: 'do-nghien',
    title: 'Kiểm Tra Độ Nghiện',
    shortTitle: 'Test độ nghiện',
    subtitle: 'Đánh giá nguy cơ liên quan đến việc lạm dụng chất.',
    description: 'BẠN ĐÃ TỪNG NHƯ THẾ NÀY CHƯA:',
    questions: [
      { question: 'Bạn đã từng thấy mình nên cắt giảm việc uống rượu bia hay dùng thuốc chưa?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: 'Bạn đã từng bao giờ khó chịu khi bị người khác chỉ trích về việc uống rượu bia hay dùng thuốc?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: 'Bạn đã từng thấy tội lỗi về việc uống rượu bia hay dùng thuốc chưa?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: 'Bạn đã từng uống rượu bia hay dùng thuốc ngay từ sáng để trấn an tinh thần hoặc để giã rượu chưa?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { 
        question: 'Bạn cảm thấy lo lắng về chất hoặc vấn đề nghiện nào?',
        subtitle: 'Hãy chọn tất cả những mục liên quan.',
        multipleChoice: true,
        options: [
          { text: 'Đồ uống có cồn', score: 0 },
          { text: 'Cần sa', score: 0 },
          { text: 'Cocaine/Ma túy đá', score: 0 },
          { text: 'Heroine', score: 0 },
          { text: 'Thuốc giảm đau opiod theo đơn', score: 0 },
          { text: 'Chất kích thích (VD: Ma túy đá methamphetamine/meth, thuốc kích thích theo đơn)', score: 0 },
          { text: 'Benzodiazepine (VD: Xanax, Valium)', score: 0 },
          { text: 'Thuốc lá', score: 0 },
          { text: 'Tự hại/ngược đãi bản thân, tự làm đau', score: 0 },
          { text: 'Khác (VD: cờ bạc/cá độ, tình dục, internet, mua sắm, đồ ăn, v.v.)', score: 0 }
        ]
      }
    ],
    scales: [
      { min: 0, max: 0, label: 'Không có dấu hiệu đáng kể', description: 'Kết quả hiện tại cho thấy bạn hoàn toàn an toàn và kiểm soát vô cùng tốt các chất kích thích hay những chứng nghiện nói chung. Chúc mừng bạn đang duy trì được ranh giới lành mạnh đối với sức khỏe của mình.' },
      { min: 1, max: 2, label: 'Nguy cơ tiềm ẩn', description: 'Có những chỉ báo cho thấy bạn đang gặp phải những sự lạm dụng nhất định đối với các chất (như rượu bia, thuốc) hoặc một thói quen gây nghiện. Sự bắt đầu này có thể chưa hủy hoại toàn bộ công việc hay gia đình, nhưng nó có thể đi xa hơn nữa nếu không được kiểm soát. Hãy chú trọng theo dõi cảm giác cần kìm nén của bản thân và từ từ xa rời các cám dỗ.' },
      { min: 3, max: 4, label: 'Nguy cơ lâm sàng', description: 'Đây là tình trạng báo động! Biểu hiện cho thấy bạn đang có khả năng rơi vào sự lệ thuộc thực sự vào chất kích thích hoặc những thói quen gây nghiện. Nghiện không phải là giới hạn của đạo đức mà nó là một bệnh lý thần kinh - sức khỏe cần sự giúp đỡ.\n\nHãy dũng cảm mở lời với người thân và ngay lập tức liên hệ với một chuyên gia y tế tế/cơ sở cai nghiện/nhà trị liệu để được xây dựng phác đồ cai nghiện, thay đổi lại hệ nơ-ron thần kinh và đón nhận lại cuộc sống tự do thực sự.' }
    ]
  },
  {
    id: 'tram-cam-bo-me',
    title: 'Test Trầm Cảm Cho Cặp Bố Mẹ Trẻ',
    shortTitle: 'Test trầm cảm cho bố mẹ trẻ',
    subtitle: 'Đây là bài test trầm cảm cho cặp vợ chồng đang mang thai hoặc mới có con. Vui lòng chọn đáp án gần nhất với cảm giác của bạn trong vòng 7 ngày vừa qua.',
    description: 'TRONG 7 NGÀY QUA BẠN CẢM THẤY THẾ NÀO?',
    questions: [
      { question: '1. Tôi có thể cười và thấy mặt hài hước của vấn đề', options: [{ text: 'Vẫn Như Trước', score: 0 }, { text: 'Hơi Kém Hơn Trước', score: 1 }, { text: 'Kém Hẳn Hơn Trước', score: 2 }, { text: 'Không Hề', score: 3 }] },
      { question: '2. Tôi đã háo hức mong đợi rất nhiều điều', options: [{ text: 'Vẫn Như Trước', score: 0 }, { text: 'Hơi Kém Hơn Trước', score: 1 }, { text: 'Kém Hẳn Hơn Trước', score: 2 }, { text: 'Gần Như Không Hề', score: 3 }] },
      { question: '3. Tôi đổ lỗi cho mình một cách không cần thiết nếu có chuyện xấu xảy ra', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Không Thường Xuyên', score: 1 }, { text: 'Thỉnh Thoảng', score: 2 }, { text: 'Thường Xuyên', score: 3 }] },
      { question: '4. Tôi hay lo lắng và bất an vô cớ', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Gần Như Không', score: 1 }, { text: 'Thỉnh Thoảng', score: 2 }, { text: 'Thường Xuyên', score: 3 }] },
      { question: '5. Tôi hay sợ hoặc hoảng loạn vô cớ', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Gần Như Không', score: 1 }, { text: 'Thỉnh Thoảng', score: 2 }, { text: 'Thường Xuyên', score: 3 }] },
      { question: '6. Mọi việc cảm giác như đổ dồn lên đầu', options: [{ text: 'Tôi Vẫn Xoay Xở Được Như Thường', score: 0 }, { text: 'Phần Lớn Thời Gian Tôi Xoay Xở Được', score: 1 }, { text: 'Thỉnh Thoảng Tôi Không Xoay Xở Được', score: 2 }, { text: 'Phần Lớn Thời Gian Tôi Không Xoay Xở Được', score: 3 }] },
      { question: '7. Tôi căng thẳng tới mức khó ngủ', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Không Thường Xuyên', score: 1 }, { text: 'Thỉnh Thoảng', score: 2 }, { text: 'Thường Xuyên', score: 3 }] },
      { question: '8. Tôi cảm thấy buồn hay đau khổ', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Không Thường Xuyên', score: 1 }, { text: 'Khá Thường Xuyên', score: 2 }, { text: 'Thường Xuyên', score: 3 }] },
      { question: '9. Tôi thấy buồn tới phát khóc', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Thỉnh Thoảng', score: 1 }, { text: 'Khá Thường Xuyên', score: 2 }, { text: 'Thường Xuyên', score: 3 }] },
      { question: '10. Tôi đã nghĩ tới việc tự làm tổn thương mình', options: [{ text: 'Không Bao Giờ', score: 0 }, { text: 'Gần Như Không', score: 1 }, { text: 'Thỉnh Thoảng', score: 2 }, { text: 'Thường Xuyên', score: 3 }] }
    ],
    scales: [
      { min: 0, max: 8, label: 'Tinh thần tốt', description: 'Chào những người làm cha mẹ, trạng thái tinh thần của bạn trong tuần lễ vừa qua rất tích cực và vui vẻ. Các thay đổi về cấu trúc cơ thể, hormone hay xáo trộn nhịp sinh hoạt dường như không làm khó được bạn. Hãy tiếp tục nâng niu thời gian quý báu này và tương tác nhiều hơn với bạn đời nhé.' },
      { min: 9, max: 12, label: 'Có nguy cơ (Borderline)', description: 'Bạn đang xuất hiện một số dấu hiệu trầm cảm nhẹ mấp mé. Quá trình mang thai hay mới đón con khôn lớn đi kèm với muôn vàn áp lực. Dù chưa phải là trầm cảm nhưng đó là lời nhắc nhở rằng cơ thể và tinh thần bạn cần được nghỉ ngơi. Đừng ngại san sẻ bớt công việc nhà và việc chăm con cho người thân để có thêm thời gian dành cho chính mình.' },
      { min: 13, max: 30, label: 'Nguy cơ trầm cảm', description: 'Bài test cho thấy một sự đáng báo động: việc mang thai và sinh nở dường như đang vắt kiệt sức lực, đè nén bạn tới mức có biểu hiện trầm cảm rõ rệt. Đừng cảm thấy quá tội lỗi khi có cảm xúc tiêu cực với bản thân hay em bé, nó là hệ quả của hormone và sự kiệt quệ thể chất.\n\nĐừng cố gắng kìm nén điều này một mình, hãy thổ lộ cùng chồng/vợ hoặc người thân gần gũi, và quan trọng nhất, đi gặp một bác sĩ tâm lý ngay khi có thể. Đứa trẻ cất tiếng khóc ra mào thì một người mẹ/cha hạnh phúc cũng cần được sinh ra.' }
    ]
  },
  {
    id: 'ocd',
    title: 'Sàng lọc Rối loạn Ám ảnh Cưỡng chế – OCD',
    shortTitle: 'Test Rối loạn ám ảnh cưỡng chế',
    subtitle: 'Kiểm tra nhanh thông qua các hành vi lặp đi lặp lại và sự lo âu cưỡng chế.',
    description: 'BẠN CÓ BỊ LÀM PHIỀN BỞI NHỮNG SUY NGHĨ/HÌNH ẢNH HOẶC CÓ CẢM GIÁC BỊ THÚC ĐẨY THỰC HIỆN CÁC HÀNH ĐỘNG SAU KHÔNG:',
    questions: [
      { question: '1. Lo ngại về ô nhiễm (bụi bẩn, vi trùng, hóa chất, phóng xạ) hoặc mắc các bệnh hiểm nghèo như HIV / AIDS?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: '2. Quá suy nghĩ về việc giữ các đồ vật (quần áo, hàng tạp hóa, dụng cụ) theo thứ tự hoàn hảo hay được sắp xếp gọn gàng?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: '3. Hình ảnh về cái chết hoặc những sự kiện khủng khiếp khác?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: '4. Những suy nghĩ không thể chấp nhận được về tôn giáo hoặc tình dục của bản thân', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: '5. Cháy, trộm, hoặc ngập nhà?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: '6. Vô tình tông xe vào người đi bộ hoặc để xe lăn xuống dốc?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: '7. Làm lây lan một căn bệnh (chẳng hạn như làm cho ai đó bị cúm)?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: '8. Đánh mất thứ gì đó có giá trị?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: '9. Làm hại đến người thân vì bạn bất cẩn?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: '10. Bạn có lo lắng về việc hành động theo một sự thôi thúc không mong muốn và vô nghĩa (làm hại người lớn, lao ra đường, v.v)?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: '11. Rửa, làm sạch hoặc chải chuốt quá mức?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: '12. Kiểm tra công tắc đèn, vòi nước, bếp, khóa cửa, hoặc phanh khẩn cấp?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: '13. Đếm; sắp xếp; có hành vi làm cho mọi thứ đều hoặc bằng nhau?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: '14. Thu thập các đồ vật vô dụng hoặc kiểm tra rác trước khi nó được ném ra ngoài?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: '15. Lặp lại các hành động thông thường (đi qua ngưỡng cửa, v.v) một số lần nhất định hoặc cho đến khi cảm thấy vừa ý?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: '16. Cần chạm vào đồ vật nào đó hoặc con người?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: '17. Đọc lại hoặc viết lại một cách không cần thiết; mở lại phong bì trước khi chúng được gửi đi?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: '18. Kiểm tra cơ thể của bạn để tìm dấu hiệu của bệnh tật?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: '19. Tránh các màu ("đỏ" có nghĩa là máu), các con số ("13"), hoặc những cái tên liên quan đến sợ hãi?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] },
      { question: '20. Cần "thú nhận" hoặc liên tục yêu cầu ai đó trấn an rằng bạn đã nói hoặc làm điều gì đó đúng?', options: [{ text: 'Không', score: 0 }, { text: 'Có', score: 1 }] }
    ],
    scales: [
      { min: 0, max: 2, label: 'Không có dấu hiệu ám ảnh cưỡng chế (OCD)', description: 'Sự kiểm tra lặp lại hoặc tính chỉn chu của bạn phần lớn là sự cẩn trọng một cách tự nhiên lành mạnh, không phải một nỗi khao khát phi lý gây ám ảnh. Hãy tiếp tục phát huy tinh thần cẩn thận này một cách hợp lý nhé.' },
      { min: 3, max: 20, label: 'Nguy cơ mang chứng OCD', description: 'Kết quả khảo sát phản ánh rằng bạn đang sở hữu khá nhiều dấu hiệu liên quan đến Rối loạn Ám ảnh cưỡng chế (OCD). Bạn không thể cưỡng lại những suy nghĩ hay hình ảnh lo ngại luôn bủa vây (ám ảnh) dẫn tới việc bắt buộc phải thực hiện các chuỗi hành động kiểm tra lặp lại (cưỡng chế) để xoa dịu nỗi sợ.\n\nViệc này nếu kéo dài sẽ hút sạch năng lượng tâm trí, làm giảm đáng kể hiệu suất não bộ và cản trở cuộc sống thường nhật. Lời khuyên tốt nhất dành cho bạn là hãy sớm đặt hẹn thăm khám cùng nhà Trị liệu Tâm lý để thiết lập phác đồ "phơi nhiễm ngược" và những kỹ thuật hành vi hiệu quả.' }
    ]
  }
];
