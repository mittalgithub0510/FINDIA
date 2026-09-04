const fs = require('fs');
const path = require('path');
const { EdgeTTS } = require('node-edge-tts');

const outputDir = path.resolve(__dirname, '../public/audio/delhi');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Neural Voices
const EN_VOICE = 'en-IN-NeerjaNeural';
const HI_VOICE = 'hi-IN-SwaraNeural';

const audioScripts = [
  {
    slug: 'red-fort',
    en: `Welcome to the Lal Qila, or the Red Fort of Delhi, an enduring symbol of India's sovereignty and Mughal architectural grandeur. Commissioned in 1638 by Emperor Shah Jahan when he decided to shift his imperial capital from Agra to Delhi, this fortified citadel took nearly a decade to complete under the master architect Ustad Ahmad Lahori. As you stand before the towering octagonal sandstone ramparts, notice how the fort harmoniously blends Persian, Timurid, and Hindu stylistic traditions. Walking through the imposing Lahore Gate, you enter the Chhatta Chowk, a historic covered vaulted bazaar where jewelers, silk weavers, and court artisans once traded luxury wares. Further inside lies the Naubat Khana, where royal musicians announced the arrival of nobles, opening into the expansive courtyard of the Diwan-i-Aam, the Hall of Public Audience. Here, beneath sixty intricately carved red sandstone pillars, Shah Jahan sat on an elevated marble balcony to hear the petitions of his subjects. Beyond lies the Diwan-i-Khas, the Hall of Private Audience, crafted entirely in gleaming white marble, which once housed the legendary jewel-encrusted Peacock Throne before it was plundered by Nadir Shah. Along the palace pavilions flows the Nahr-i-Bihisht, or the Stream of Paradise, drawing water from the Yamuna River to cool the imperial residences. Each year on the fifteenth of August, India's Prime Minister hoists the national tricolor from these very ramparts, continuing a living tradition of national pride. Take a moment to absorb the vibrant echoes of history that resonate throughout these storied walls.`,
    hi: `लाल किले की इस ऐतिहासिक यात्रा में आपका हार्दिक स्वागत है। दिल्ली का यह भव्य लाल किला न केवल मुग़ल वास्तुकला का अनुपम उदाहरण है, बल्कि भारत के गौरव और संप्रभुता का अमर प्रतीक भी है। सन 1638 में जब मुग़ल सम्राट शाहजहाँ ने अपनी राजधानी को आगरा से दिल्ली स्थानांतरित करने का निर्णय लिया, तब इस विशाल दुर्ग का निर्माण शुरू हुआ। प्रसिद्ध वास्तुकार उस्ताद अहमद लाहौरी के निर्देशन में लगभग दस वर्षों की कड़ी मेहनत के बाद यह लाल बलुआ पत्थर का किला बनकर तैयार हुआ। जैसे ही आप लाहौरी गेट से प्रवेश करते हैं, आपका सामना छत्ता चौक से होता है। यह एक ढका हुआ ऐतिहासिक बाज़ार है, जहाँ कभी शाही जौहरी, रेशम व्यापारी और दस्तकार अपनी कलाकृतियाँ प्रदर्शित करते थे। आगे बढ़ने पर नौबत खाना स्थित है, जहाँ से संगीतकारों की धुनें शाही दरबारियों के आगमन की घोषणा करती थीं। इसके ठीक पीछे दीवान-ए-आम का विशाल प्रांगण है, जहाँ सम्राट संगमरमर के झरोखे से आम जनता की फ़रियाद सुनते थे। और आगे चलकर दीवान-ए-ख़ास आता है, जो सफ़ेद संगमरमर से बना हुआ अत्यंत नक्काशीदार कक्ष है। इसी स्थान पर कभी विश्वप्रसिद्ध मयूर सिंहासन यानी तख़्त-ए-ताऊस सुशोभित था। इन महलों के बीच से बहने वाली नहर-ए-बहिश्त यमुना के ठंडे जल से शाही कक्षों को शीतल रखती थी। हर वर्ष 15 अगस्त को भारत के प्रधानमंत्री इसी लाल किले की प्राचीर से तिरंगा फहराते हैं। आइए, इस ऐतिहासिक धरोहर की हर दीवार में बसी गौरवगाथा को महसूस कीजिए।`
  },
  {
    slug: 'qutub-minar',
    en: `Welcome to the Qutub Minar complex, a UNESCO World Heritage site standing as a monumental testament to the dawn of Islamic architecture in northern India. Soaring seventy-two and a half meters into the Delhi sky, this tapering fluted minaret was initiated in 1199 by Qutb-ud-din Aibak, the founder of the Delhi Sultanate, following the defeat of Delhi's last Hindu kingdom. While Aibak erected only the colossal base level, his successor Shams-ud-din Iltutmish added three more sandstone storeys, and later Firoz Shah Tughlaq rebuilt the damaged top tier using a striking combination of white marble and red sandstone. As you gaze upward, observe the intricate projecting balconies supported by stalactite corbeling and adorned with beautifully chiseled Arabic calligraphy from the Holy Quran. Beside the soaring minaret lies the Quwwat-ul-Islam Mosque, the oldest surviving mosque in northern India. Notice how its tranquil cloistered courtyard incorporates columns rescued from earlier historic temples, creating a poignant confluence of medieval artistic traditions. At the center of the courtyard stands the enigmatic fourth-century Iron Pillar of Chandragupta the Second. Weighing over six tonnes, this metallurgical marvel has resisted rust and corrosion for over sixteen hundred years, baffling modern materials scientists and metallurgists worldwide. As you stroll through the serene ruins of Alai Darwaza and the tombs of ancient sultans, you witness eight centuries of Delhi's dramatic architectural evolution. Take your time to explore the craftsmanship etched into every sandstone block.`,
    hi: `कुतुब मीनार परिसर में आपका स्वागत है। यूनेस्को की यह विश्व धरोहर उत्तर भारत में मध्यकालीन वास्तुकला और इतिहास का एक बेजोड़ प्रतीक है। बहत्तर दशमलव पाँच मीटर ऊंची यह भव्य मीनार ईंटों से बनी विश्व की सबसे ऊंची मीनारों में से एक है। इसकी नींव सन 1199 में दिल्ली सल्तनत के संस्थापक कुतुबुद्दीन ऐबक ने रखी थी। ऐबक ने केवल इसका आधार तल बनाया, जिसके बाद उनके उत्तराधिकारी शमसुद्दीन इल्तुतमिश ने इस पर तीन और मंजिलें जोड़ीं। बाद में फ़िरोज़ शाह तुग़लक ने शीर्ष भाग का जीर्णोद्धार सफ़ेद संगमरमर और लाल बलुआ पत्थर के सुंदर संयोजन से कराया। मीनार की सतह पर कुरान की आयतें और ज्यामितीय नक्काशी बहुत ही बारीकी से तराशी गई हैं। मीनार के ठीक पास कुव्वत-उल-इस्लाम मस्जिद स्थित है, जो उत्तर भारत की सबसे प्राचीन मस्जिदों में गिनी जाती है। इसके प्रांगण में चौथी शताब्दी का प्रसिद्ध लौह स्तंभ खड़ा है, जिसे गुप्त वंश के सम्राट चंद्रगुप्त विक्रमादित्य के काल का माना जाता है। छह टन से अधिक वजनी यह लौह स्तंभ पिछले सोलह सौ से अधिक वर्षों से धूप और बारिश में बिना जंग लगे जस का तस खड़ा है, जो प्राचीन भारतीय धातु विज्ञान का एक चमत्कारी प्रमाण है। अलाउद्दीन खिलजी का अलाई दरवाज़ा और सल्तनत काल के मकबरे इस पूरे परिसर को ऐतिहासिक गरिमा प्रदान करते हैं। इस ऐतिहासिक वातावरण में शांति से चलिए और इतिहास की इस अनमोल विरासत का अनुभव कीजिए।`
  },
  {
    slug: 'humayuns-tomb',
    en: `Welcome to the serene garden tomb of the Mughal Emperor Humayun, an architectural masterpiece that profoundly inspired the creation of the Taj Mahal nearly a century later. Commissioned in 1565 by Humayun's devoted senior queen, Bega Begum, also known as Haji Begum, and designed by Persian architect Mirak Mirza Ghiyas, this monument introduced the grand Charbagh or Persian four-part paradise garden to the Indian subcontinent. As you walk along the raised sandstone causeways, notice how water channels symmetrically divide the lush manicured lawns into four distinct quadrants, symbolizing the four rivers of paradise described in classical texts. At the heart of the complex rises the magnificent double-domed mausoleum, elevated upon an expansive arcaded terrace. Constructed of rich red sandstone highlighted with delicate white marble inlay, the tomb showcases the first monumental Persian double dome in India, creating an imposing exterior height while maintaining graceful interior proportions. Beneath the high central dome lies the polished marble cenotaph of Emperor Humayun, illuminated by soft sunlight filtering through perforated stone jali lattice screens. Known as the dormitory of the House of Timur, the complex also contains the resting places of more than one hundred and fifty Mughal royals and noble courtiers. As birdsong fills the tranquil tree-lined pathways, you can feel the quiet elegance and profound harmony that make Humayun's Tomb one of Delhi's most restorative historical sanctuaries. Walk slowly and enjoy the sublime symmetry.`,
    hi: `हुमायूँ के मकबरे के इस शांत और भव्य प्रांगण में आपका स्वागत है। यूनेस्को की यह विश्व धरोहर मुग़ल वास्तुकला का एक उत्कृष्ट नमूना है, जिसने आगे चलकर आगरा के विश्वप्रसिद्ध ताजमहल के निर्माण की प्रेरणा दी थी। इस मकबरे का निर्माण सन 1565 में सम्राट हुमायूँ की बेगम हमीदा बानो और बेगा बेगम की देखरेख में शुरू हुआ था। इसे फ़ारसी वास्तुकार मीरक मिर्ज़ा ग़ियास ने डिज़ाइन किया था। यह भारतीय उपमहाद्वीप का पहला चारबाग शैली का मकबरा है। चारों ओर फैले हरे-भरे बागीचों के बीच से बहती जलधाराएँ इसे जन्नत के चार बागों का स्वरूप प्रदान करती हैं। ऊंचे चबूतरे पर स्थित यह मुख्य मकबरा लाल बलुआ पत्थर और सफ़ेद संगमरमर की नक्काशी से सजाया गया है। इसका विशाल दोहरा गुंबद भारत में अपनी तरह का पहला स्थापत्य प्रयोग था। मुख्य कक्ष के अंदर सम्राट हुमायूँ की संगमरमर की समाधि स्थित है, जहाँ जालीदार खिड़कियों से छनकर आती धूप एक दिव्य आभा पैदा करती है। इस परिसर में लगभग एक सौ पचास मुग़ल राजकुमारों और बेगमों की कब्रें भी मौजूद हैं, जिसके कारण इसे 'मुग़ल वंश का शयनागार' भी कहा जाता है। शांत वातावरण, परिंदों की चहचहाहट और सुंदर फव्वारों के बीच, हुमायूँ का यह मकबरा दिल्ली के दिल में इतिहास का एक अनमोल मोती है। इस सुकून भरे माहौल का आनंद लें।`
  },
  {
    slug: 'india-gate',
    en: `Welcome to India Gate, standing proudly at the eastern terminus of the ceremonial Kartavya Path in the heart of New Delhi. Designed by the celebrated British architect Sir Edwin Lutyens and completed in 1931, this majestic forty-two-meter-high triumphal arch commemorates the extraordinary valor and sacrifice of over eighty-four thousand soldiers of the undivided British Indian Army who laid down their lives during the First World War and the Third Anglo-Afghan War. If you look closely at the pale red and yellow Bharatpur sandstone facade, you will observe the names of more than thirteen thousand soldiers meticulously engraved into the monument's colossal pillars. Beneath the soaring central archway lies the Amar Jawan Jyoti, the eternal flame that burned continuously from 1971 until 2022, honoring the brave martyrs of the Indo-Pakistani War. Today, that eternal flame has been merged with the National War Memorial, located just a short walk eastward across the landscaped lawns, paying solemn tribute to all fallen heroes of independent India. As dusk descends, India Gate is illuminated with the vibrant saffron, white, and green colors of the Indian national flag, while gentle fountains and lush lawns attract thousands of families, evening walkers, and visitors from across the globe. Take a moment of quiet reflection to honor the selfless bravery etched forever into this monumental archway.`,
    hi: `कर्तव्य पथ के छोर पर स्थित भव्य इंडिया गेट पर आपका हार्दिक स्वागत है। बयालीस मीटर ऊंचा यह विशाल स्मारक भारत के वीर सपूतों के अदम्य साहस और अमर बलिदान का जीवंत प्रतीक है। इसका डिज़ाइन प्रसिद्ध वास्तुकार सर एडविन लुटियंस ने तैयार किया था और यह 1931 में बनकर पूरा हुआ था। यह स्मारक प्रथम विश्व युद्ध और तीसरे एंग्लो-अफ़ग़ान युद्ध में शहीद हुए ब्रिटिश भारतीय सेना के चौरासी हज़ार से अधिक वीर सैनिकों की स्मृति में समर्पित है। इसकी लाल और पीले बलुआ पत्थर की विशाल दीवारों पर तेरह हज़ार से अधिक वीर शहीदों के नाम बड़ी ही श्रद्धा के साथ उकेरे गए हैं। मुख्य मेहराब के नीचे 1971 से प्रज्वलित रहने वाली 'अमर जवान ज्योति' लंबे समय तक देश के वीर शहीदों की याद दिलाती रही, जिसे अब निकट ही स्थित राष्ट्रीय युद्ध स्मारक की अखंड ज्योति के साथ समाहित कर दिया गया है। शाम ढलते ही जब इंडिया गेट तिरंगे के तीन रंगों की रोशनी से जगमगाता है, तो यहाँ का दृश्य अत्यंत मनमोहक और देशभक्ति की भावना से ओत-प्रोत हो जाता है। चारों ओर फैले फव्वारे और हरी-भरी घास पर हर शाम हजारों लोग सुकून के पल बिताने आते हैं। आइए, देश के उन जांबाज वीरों को नमन करें, जिनकी अमर गाथा इस पाषाण स्तंभ में हमेशा के लिए अमर हो चुकी है।`
  },
  {
    slug: 'lotus-temple',
    en: `Welcome to the Lotus Temple, formally known as the Bahá'í House of Worship, nestled in the southern landscape of New Delhi. Completed in December 1986 and designed by the Iranian-Canadian architect Fariborz Sahba, this breathtaking sanctuary is universally celebrated for its distinctive flower-like form, symbolizing purity, peace, and the spiritual oneness of all humanity. The architectural masterpiece is composed of twenty-seven free-standing petals sculpted from immaculate white Greek marble from Mount Pentelikon, arranged in graceful clusters of three to form nine distinct entrances. These nine doorways open into a soaring central prayer hall capable of accommodating twenty-five hundred people. In accordance with Bahá'í teachings, the temple is open to all people, regardless of religion, nationality, or background, and contains no idols, pictures, or religious dogmas. Instead, visitors of all faiths sit together in sacred silence, meditation, or prayer beneath the luminous central skylight. Surrounding the petal structure are nine clear blue ponds and twenty-six acres of tranquil landscaped gardens, designed to naturally cool the sanctuary while mirroring the petal silhouettes under the sun. Having welcomed over one hundred million visitors from every corner of the planet, the Lotus Temple remains one of the most visited and universally revered sacred buildings in the modern world. Please enter in quiet reverence and embrace this oasis of profound peace.`,
    hi: `नई दिल्ली के शांत वातावरण में स्थित लोटस टेम्पल यानी बहाई उपासना मंदिर में आपका स्वागत है। सन 1986 में बनकर तैयार हुआ यह अद्भुत मंदिर अपनी कमल के फूल जैसी अनूठी वास्तुकला के लिए पूरी दुनिया में विख्यात है। कमल का फूल पवित्रता, शांति और सभी धर्मों की एकता का प्रतीक माना जाता है। इस विश्वप्रसिद्ध इमारत की रूपरेखा ईरानी वास्तुकार फ़रीबोर्ज़ सहबा ने तैयार की थी। इस मंदिर का निर्माण ग्रीस से लाए गए सत्ताईस सफ़ेद संगमरमर की पंखुड़ियों से किया गया है, जिन्हें तीन-तीन के समूहों में नौ द्वारों के रूप में व्यवस्थित किया गया है। ये नौ द्वार पच्चीस सौ लोगों की क्षमता वाले एक विशाल केंद्रीय प्रार्थना सभागार में खुलते हैं। बहाई धर्म की शिक्षाओं के अनुसार, यह मंदिर किसी भी धर्म, जाति या पंथ के व्यक्ति के लिए खुला है। यहाँ कोई मूर्ति, तस्वीर या कर्मकांड नहीं है; केवल पूर्ण शांति, मौन और प्रार्थना का वास है। मंदिर के चारों ओर नौ नीले पानी के सुंदर तालाब और छब्बीस एकड़ के हरे-भरे बागीचे बने हैं, जो गर्मियों में मंदिर को स्वाभाविक रूप से ठंडा रखते हैं। अब तक दुनिया भर से दस करोड़ से अधिक लोग यहाँ आकर शांति का अनुभव कर चुके हैं। आइए, इस पावन और शांत वातावरण में कुछ पल मौन रहकर आत्मिक शांति का अनुभव कीजिए।`
  }
];

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateFileWithRetry(text, filepath, voice, lang, maxRetries = 3) {
  if (fs.existsSync(filepath) && fs.statSync(filepath).size > 100000) {
    console.log(`⚡ Skipping (Already exists & valid): ${path.basename(filepath)} (${fs.statSync(filepath).size} bytes)`);
    return true;
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[Attempt ${attempt}/${maxRetries}] Generating ${path.basename(filepath)} with ${voice}...`);
      const tts = new EdgeTTS({
        voice,
        lang,
        timeout: 90000 // 90 seconds timeout
      });
      await tts.ttsPromise(text, filepath);
      const size = fs.existsSync(filepath) ? fs.statSync(filepath).size : 0;
      if (size > 10000) {
        console.log(`✓ Successfully generated: ${path.basename(filepath)} (${size} bytes)`);
        await sleep(1500); // 1.5s pause to prevent socket congestion
        return true;
      }
    } catch (err) {
      console.warn(`Warning on attempt ${attempt} for ${path.basename(filepath)}:`, err.message || err);
      await sleep(3000); // Wait 3s before retry
    }
  }
  console.error(`❌ All attempts failed for ${path.basename(filepath)}`);
  return false;
}

async function generateAll() {
  console.log('--- Starting Ultra-Realistic Audio Generation with 90s Timeout ---');
  
  for (const item of audioScripts) {
    // English
    const enFile = path.join(outputDir, `${item.slug}-en.mp3`);
    await generateFileWithRetry(item.en, enFile, EN_VOICE, 'en-IN');

    // Hindi
    const hiFile = path.join(outputDir, `${item.slug}-hi.mp3`);
    await generateFileWithRetry(item.hi, hiFile, HI_VOICE, 'hi-IN');
  }

  console.log('--- Complete! ---');
}

generateAll().catch(console.error);
