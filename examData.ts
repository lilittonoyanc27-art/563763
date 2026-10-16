/**
 * Full curriculum data for Examen Oral 1 and Examen Oral 2 (7.º curso, A2-B1).
 * Spanish with Armenian translations, model answers, tenses, and role-plays.
 */

export interface ExamItem {
  id: string;
  number: number;
  spanish: string;
  armenian: string;
  speaker?: string;
  modelAnswerSpanish?: string;
  modelAnswerArmenian?: string;
  notes?: string;
  grammarTense?: string;
  options?: { text: string; armenian: string; isCorrect: boolean }[];
  explanation?: string;
}

export interface RolePlayDialogue {
  id: string;
  titleEs: string;
  titleHy: string;
  turns: {
    speaker: 'A' | 'B';
    roleTitleEs?: string;
    roleTitleHy?: string;
    textEs: string;
    textHy: string;
    promptHy?: string;
    modelAnswerEs?: string;
    modelAnswerHy?: string;
  }[];
}

export interface SurpriseSituation {
  id: string;
  step: number;
  total: number;
  titleEs: string;
  titleHy: string;
  instructionsHy: string;
  modelSpeechEs: string;
  modelSpeechHy: string;
  modelQuestionEs: string;
  modelQuestionHy: string;
}

export interface EmergencyPhrase {
  id: string;
  spanish: string;
  armenian: string;
  usageContext: string;
}

// ---------------- EXAMEN 1 ----------------

export const EXAM_1_INFO = {
  id: 'examen-1',
  titleEs: 'EXAMEN ORAL DE ESPAÑOL — 7.º CURSO',
  titleHy: 'Իսպաներենի խոսակցական փորձնական քննություն · A2–B1 · 7-րդ դասարան',
  subtitleHy: 'Թեմաներ՝ ընկերներ, դասընկերներ, դպրոց, ֆուտբոլ, մարզիչ, թիմակիցներ և իրական իրավիճակներ։',
  descriptionHy:
    'Այս քննությունը նախատեսված է աշակերտի համար, ով հասկանում է իսպաներեն, բայց դժվարանում է արագ պատասխանել։ Նպատակն է ստուգել՝ կարողանո՞ւմ է շփվել դասընկերների հետ, խոսել խաղի ժամանակ, արտահայտել կարծիք և ինքնուրույն շարունակել զրույցը։',
  totalPoints: 100,
  duration: '45–60 minutos',
  totalActivities: 42,
  instructionsEs: 'El profesor lee en español. El alumno responde sin traducción al armenio. Si se bloquea, el profesor puede dar la primera palabra. Las respuestas modelo están disponibles.',
  instructionsHy: 'Ուսուցիչը կարդում է իսպաներեն։ Աշակերտը պատասխանում է առանց հայերեն թարգմանության։ Եթե դժվարանում է, ուսուցիչը կարող է ասել պատասխանի առաջին բառերը։ Յուրաքանչյուր բաժնի պատասխանները տրված են առաջադրանքներից հետո։',
};

export const EXAM_1_PARTE_1: ExamItem[] = [
  {
    id: 'e1-p1-1',
    number: 1,
    spanish: '¡Ey! ¿Qué tal, tío?',
    armenian: 'Հե՜յ, ո՞նց ես, ախպեր։',
    modelAnswerSpanish: '¡Hola! Muy bien, ¿y tú? ¿Qué cuentas?',
    modelAnswerArmenian: 'Ողջո՛ւյն։ Շատ լավ, իսկ դո՞ւ։ Ի՞նչ կա չկա։',
  },
  {
    id: 'e1-p1-2',
    number: 2,
    spanish: 'Oye, ¿me dejas tu boli un momento?',
    armenian: 'Լսի՛ր, գրիչդ մի պահ կտա՞ս։',
    modelAnswerSpanish: 'Sí, claro, toma. Pero devuélvemelo al final de la clase, ¿vale?',
    modelAnswerArmenian: 'Այո՛, իհարկե, վերցրո՛ւ։ Բայց դասի վերջում ինձ ետ տուր, լա՞վ։',
  },
  {
    id: 'e1-p1-3',
    number: 3,
    spanish: '¿Te vienes con nosotros al recreo?',
    armenian: 'Դասամիջոցին մեզ հետ գալի՞ս ես։',
    modelAnswerSpanish: '¡Claro que sí! Esperadme un segundo que guardo el estuche.',
    modelAnswerArmenian: 'Իհարկե գալիս եմ։ Մի վայրկյան սպասեք, գրչատուփս հավաքեմ։',
  },
  {
    id: 'e1-p1-4',
    number: 4,
    spanish: '¿Has hecho los deberes de mates?',
    armenian: 'Մաթեմատիկայի տնայինն արե՞լ ես։',
    modelAnswerSpanish: 'Sí, los he hecho ayer, pero el último ejercicio me ha costado un poco.',
    modelAnswerArmenian: 'Այո, երեկ եմ արել, բայց վերջին վարժության վրա մի քիչ դժվարացա։',
  },
  {
    id: 'e1-p1-5',
    number: 5,
    spanish: '¡Tío, he sacado un diez!',
    armenian: 'Ախպե՛ր, 10 եմ ստացել։',
    modelAnswerSpanish: '¡Enhorabuena, máquina! ¡Menuda nota!',
    modelAnswerArmenian: 'Շնորհավորո՛ւմ եմ, հզոր ես։ Ի՜նչ հիանալի գնահատական է։',
  },
  {
    id: 'e1-p1-6',
    number: 6,
    spanish: '¿Por qué estás tan serio hoy?',
    armenian: 'Ինչո՞ւ ես այսօր այդքան լուրջ։',
    modelAnswerSpanish: 'No es nada, es que no he dormido bien y me duele un poco la cabeza.',
    modelAnswerArmenian: 'Ոչինչ չկա, պարզապես լավ չեմ քնել և գլուխս մի փոքր ցավում է։',
  },
  {
    id: 'e1-p1-7',
    number: 7,
    spanish: 'Perdona, se me ha olvidado llamarte.',
    armenian: 'Կներես, մոռացել եմ քեզ զանգահարել։',
    modelAnswerSpanish: 'No te preocupes, no pasa nada. Ya hablaremos luego.',
    modelAnswerArmenian: 'Մի՛ անհանգստացիր, ոչինչ չկա։ Հետո կխոսենք։',
  },
  {
    id: 'e1-p1-8',
    number: 8,
    spanish: '¿Te apetece echar un partido después de clase?',
    armenian: 'Կուզե՞ս դասերից հետո մի պարտիա ֆուտբոլ խաղալ։',
    modelAnswerSpanish: '¡De una! ¿Dónde jugamos, en el campo del cole o en el parque?',
    modelAnswerArmenian: 'Միանգամից համաձայն եմ։ Որտե՞ղ ենք խաղալու՝ դպրոցի դաշտո՞ւմ, թե՞ այգում։',
  },
  {
    id: 'e1-p1-9',
    number: 9,
    spanish: '¡Date prisa, que llegamos tarde!',
    armenian: 'Շտապի՛ր, ուշանում ենք։',
    modelAnswerSpanish: '¡Ya voy, ya voy! No me metas prisa que me estoy atando los cordones.',
    modelAnswerArmenian: 'Հիմա գալիս եմ, գալիս եմ։ Մի շտապեցրու, կոշիկներիս քուղերն եմ կապում։',
  },
  {
    id: 'e1-p1-10',
    number: 10,
    spanish: '¿Qué hacemos este fin de semana?',
    armenian: 'Ի՞նչ ենք անում այս հանգստյան օրերին։',
    modelAnswerSpanish: 'Podemos ir al cine el sábado y el domingo jugar al fútbol por la tarde.',
    modelAnswerArmenian: 'Շաբաթ օրը կարող ենք կինո գնալ, իսկ կիրակի կեսօրից հետո ֆուտբոլ խաղալ։',
  },
];

export const EXAM_1_PARTE_2: ExamItem[] = [
  {
    id: 'e1-p2-1',
    number: 1,
    spanish: 'Tu compañero se ha olvidado el libro y te pide ayuda. ¿Qué le dices?',
    armenian: 'Դասընկերդ մոռացել է գիրքը և օգնություն է խնդրում։ Ի՞նչ կասես։',
    modelAnswerSpanish: 'No te preocupes, ponte a mi lado y compartimos mi libro durante la clase.',
    modelAnswerArmenian: 'Մի՛ անհանգստացիր, մոտեցի՛ր ինձ և դասի ընթացքում իմ գրքով կանենք։',
  },
  {
    id: 'e1-p2-2',
    number: 2,
    spanish: 'Un amigo te interrumpe constantemente mientras hablas. ¿Cómo reaccionas?',
    armenian: 'Ընկերդ անընդհատ ընդհատում է քեզ, երբ խոսում ես։ Ինչպե՞ս կարձագանքես։',
    modelAnswerSpanish: 'Oye, déjame terminar de hablar, por favor, y luego me dices lo que piensas.',
    modelAnswerArmenian: 'Լսի՛ր, խնդրում եմ, թույլ տուր ավարտեմ խոսքս, հետո դու կասես կարծիքդ։',
  },
  {
    id: 'e1-p2-3',
    number: 3,
    spanish: 'Un compañero nuevo está solo durante el recreo. ¿Qué le propones?',
    armenian: 'Նոր դասընկերը դասամիջոցին մենակ է։ Ի՞նչ կառաջարկես։',
    modelAnswerSpanish: '¡Hola! ¿Eres nuevo, verdad? ¿Te apetece venir con nosotros y te enseño el colegio?',
    modelAnswerArmenian: 'Ողջո՛ւյն։ Նորե՞կ ես, չէ՞։ Կուզե՞ս մեզ հետ գալ, ես քեզ ցույց կտամ դպրոցը։',
  },
  {
    id: 'e1-p2-4',
    number: 4,
    spanish: 'Tu amigo quiere copiar tus deberes. ¿Cómo respondes?',
    armenian: 'Ընկերդ ուզում է արտագրել տնային աշխատանքդ։ Ինչպե՞ս կպատասխանես։',
    modelAnswerSpanish: 'No te los voy a dejar copiar porque el profe se dará cuenta, pero si quieres te explico cómo hacerlo.',
    modelAnswerArmenian: 'Չեմ թողնի արտագրես, որովհետև ուսուցիչը կնկատի, բայց եթե ուզում ես, կբացատրեմ ինչպես լուծել։',
  },
  {
    id: 'e1-p2-5',
    number: 5,
    spanish: 'Un compañero se ríe porque has cometido un error hablando español. ¿Qué dices?',
    armenian: 'Դասընկերդ ծիծաղում է, որովհետև իսպաներեն խոսելիս սխալվել ես։ Ի՞նչ կասես։',
    modelAnswerSpanish: 'No te rías, que estoy aprendiendo y equivocarse es normal. ¡A ver cómo hablas tú armenio!',
    modelAnswerArmenian: 'Մի՛ ծիծաղիր, ես սովորում եմ, և սխալվելը բնական է։ Տեսնեմ դու ոնց ես հայերեն խոսում։',
  },
  {
    id: 'e1-p2-6',
    number: 6,
    spanish: 'Tu amigo está enfadado porque no lo has invitado a jugar. ¿Qué dices?',
    armenian: 'Ընկերդ նեղացել է, որովհետև նրան չես հրավիրել խաղալու։ Ի՞նչ կասես։',
    modelAnswerSpanish: 'Lo siento de verdad, no fue a propósito. Éramos impares y se me pasó. La próxima vez jugamos juntos sí o sí.',
    modelAnswerArmenian: 'Իսկապես կներես, դիտմամբ չէր։ Թիվը կենտ էր ու մտքիցս թռավ։ Հաջորդ անգամ անպայման միասին ենք խաղալու։',
  },
  {
    id: 'e1-p2-7',
    number: 7,
    spanish: 'Dos compañeros discuten y te piden tu opinión. ¿Cómo reaccionas?',
    armenian: 'Երկու դասընկեր վիճում են և քո կարծիքն են հարցնում։ Ինչպե՞ս կարձագանքես։',
    modelAnswerSpanish: 'Tranquilos los dos. Creo que los dos tenéis un poco de razón, así que mejor habladlo con calma sin gritar.',
    modelAnswerArmenian: 'Հանգստացե՛ք երկուսդ էլ։ Կարծում եմ՝ երկուսդ էլ մասամբ ճիշտ եք, այնպես որ ավելի լավ է հանգիստ խոսեք առանց գոռալու։',
  },
  {
    id: 'e1-p2-8',
    number: 8,
    spanish: 'El profesor te ha hecho una pregunta, pero no sabes cómo responder. ¿Qué dices?',
    armenian: 'Ուսուցիչը քեզ հարց է տվել, բայց չգիտես՝ ինչպես պատասխանել իսպաներեն։ Ի՞նչ կասես։',
    modelAnswerSpanish: 'Perdón, profesor, sé lo que quiero decir pero no sé cómo decirlo en español. ¿Me puede dar una pista?',
    modelAnswerArmenian: 'Ներողություն, ուսուցի՛չ, գիտեմ ինչ եմ ուզում ասել, բայց չգիտեմ ինչպես ասել իսպաներեն։ Կարո՞ղ եք մի փոքր հուշել։',
  },
];

export const EXAM_1_PARTE_3: ExamItem[] = [
  {
    id: 'e1-p3-1',
    number: 1,
    speaker: 'Entrenador',
    spanish: '¡No te quedes parado! ¡Muévete!',
    armenian: 'Մի՛ կանգնիր տեղում։ Շարժվի՛ր։',
    modelAnswerSpanish: '¡Voy, míster! ¡Estoy buscando espacio!',
    modelAnswerArmenian: 'Հիմա, մարզի՛չ։ Ազատ տարածություն եմ փնտրում։',
  },
  {
    id: 'e1-p3-2',
    number: 2,
    speaker: 'Compañero',
    spanish: '¡Pásamela, que estoy solo!',
    armenian: 'Ինձ փոխանցի՛ր, ազատ եմ։',
    modelAnswerSpanish: '¡Ahí va, controla y mete gol!',
    modelAnswerArmenian: 'Ահա՛, ընդունի՛ր և գո՛լ խփիր։',
  },
  {
    id: 'e1-p3-3',
    number: 3,
    speaker: 'Entrenador',
    spanish: '¿Puedes jugar de lateral derecho?',
    armenian: 'Կարո՞ղ ես խաղալ աջ եզրային պաշտպանի դիրքում։',
    modelAnswerSpanish: 'Sí, míster, no es mi posición habitual pero puedo ayudar al equipo.',
    modelAnswerArmenian: 'Այո, մարզի՛չ, իմ սովորական դիրքը չէ, բայց կարող եմ օգնել թիմին։',
  },
  {
    id: 'e1-p3-4',
    number: 4,
    speaker: 'Entrenador',
    spanish: '¡Vuelve atrás y ayuda a defender!',
    armenian: 'Վերադարձի՛ր և օգնիր պաշտպանվել։',
    modelAnswerSpanish: '¡Ya bajo! ¡Estoy cubriendo al siete!',
    modelAnswerArmenian: 'Արդեն իջնում եմ։ Հսկում եմ յոթ համարին։',
  },
  {
    id: 'e1-p3-5',
    number: 5,
    speaker: 'Compañero',
    spanish: '¿Por qué no me has pasado el balón?',
    armenian: 'Ինչո՞ւ գնդակն ինձ չփոխանցեցիր։',
    modelAnswerSpanish: 'Es que estabas marcado y vi hueco para tirar a puerta. ¡La próxima te la doy!',
    modelAnswerArmenian: 'Քեզ հսկում էին, իսկ ես հարվածելու տարածություն տեսա։ Հաջորդ անգամ քեզ կտամ։',
  },
  {
    id: 'e1-p3-6',
    number: 6,
    speaker: 'Entrenador',
    spanish: 'Vamos perdiendo dos a uno. ¡Hay que reaccionar!',
    armenian: 'Պարտվում ենք 2։1 հաշվով։ Պետք է ակտիվանանք։',
    modelAnswerSpanish: '¡Tranquilos, todavía queda tiempo! ¡Podemos remontar si presionamos arriba!',
    modelAnswerArmenian: 'Հանգի՛ստ, դեռ ժամանակ կա։ Կարող ենք հետ բերել, եթե վերևում ճնշենք։',
  },
  {
    id: 'e1-p3-7',
    number: 7,
    speaker: 'Compañero',
    spanish: '¡Buen pase, tío!',
    armenian: 'Լավ փոխանցում էր, ախպե՛ր։',
    modelAnswerSpanish: '¡De nada, qué gran desmarque has hecho!',
    modelAnswerArmenian: 'Խնդրե՛մ, ինչ հիանալի բացվեցիր։',
  },
  {
    id: 'e1-p3-8',
    number: 8,
    speaker: 'Entrenador',
    spanish: '¿Estás bien? ¿Puedes seguir jugando?',
    armenian: 'Լա՞վ ես։ Կարո՞ղ ես շարունակել խաղալ։',
    modelAnswerSpanish: 'Me duele un poco el tobillo, míster, pero quiero seguir si puedo aguantar.',
    modelAnswerArmenian: 'Մի քիչ կոճս ցավում է, մարզիչ, բայց ուզում եմ շարունակել, եթե դիմանամ։',
  },
];

export const EXAM_1_PARTE_4: RolePlayDialogue[] = [
  {
    id: 'e1-p4-1',
    titleEs: 'Conversación 1. Un compañero nuevo',
    titleHy: 'Երկխոսություն 1. Նոր դասընկեր',
    turns: [
      {
        speaker: 'A',
        roleTitleEs: 'Compañero nuevo',
        roleTitleHy: 'Նոր դասընկեր',
        textEs: '¡Hola! Soy nuevo aquí. ¿Cómo te llamas?',
        textHy: 'Բարև։ Ես այստեղ նորեկ եմ։ Անունդ ի՞նչ է։',
        promptHy: 'Պատասխանիր և հարց տուր',
        modelAnswerEs: '¡Hola! Me llamo Armen. Bienvenido a nuestro cole. ¿De dónde vienes?',
        modelAnswerHy: 'Բարև՛։ Անունս Արմեն է։ Բարի գալուստ մեր դպրոց։ Որտեղի՞ց ես եկել։',
      },
      {
        speaker: 'A',
        roleTitleEs: 'Compañero nuevo',
        roleTitleHy: 'Նոր դասընկեր',
        textEs: 'Me llamo David. ¿Qué tenemos después del recreo?',
        textHy: 'Իմ անունը Դավիդ է։ Դասամիջոցից հետո ի՞նչ դաս ունենք։',
        promptHy: 'Պատասխանիր դասացուցակի մասին',
        modelAnswerEs: 'Tenemos clase de Ciencias Sociales en la segunda planta. El profesor es muy majo.',
        modelAnswerHy: 'Երկրորդ հարկում հասարակագիտության դաս ունենք։ Ուսուցիչը շատ բարեհամբույր է։',
      },
      {
        speaker: 'A',
        roleTitleEs: 'Compañero nuevo',
        roleTitleHy: 'Նոր դասընկեր',
        textEs: 'Vale, gracias. ¿Te importa si me siento contigo?',
        textHy: 'Լավ, շնորհակալություն։ Դեմ չե՞ս, եթե քեզ հետ նստեմ։',
        promptHy: 'Հրավիրիր և առաջարկիր օգնել',
        modelAnswerEs: '¡Para nada! Siéntate aquí a mi lado, así te presto mis apuntes si los necesitas.',
        modelAnswerHy: 'Բոլորովին դեմ չեմ։ Նստի՛ր կողքիս, այդպես իմ նոթերը կտամ, եթե պետք լինեն։',
      },
    ],
  },
  {
    id: 'e1-p4-2',
    titleEs: 'Conversación 2. Planes con un compañero',
    titleHy: 'Երկխոսություն 2. Պլաններ դասընկերոջ հետ',
    turns: [
      {
        speaker: 'A',
        roleTitleEs: 'Compañero',
        roleTitleHy: 'Դասընկեր',
        textEs: 'Oye, ¿te apetece hacer el trabajo de ciencias conmigo?',
        textHy: 'Լսի՛ր, կուզե՞ս բնագիտության նախագիծը միասին անել։',
        promptHy: 'Համաձայնիր և հետաքրքրվիր',
        modelAnswerEs: '¡Sí, genial! Es un trabajo largo y entre los dos lo terminaremos más rápido.',
        modelAnswerHy: 'Այո՛, հիանալի է։ Երկար աշխատանք է, և երկուսով ավելի արագ կավարտենք։',
      },
      {
        speaker: 'A',
        roleTitleEs: 'Compañero',
        roleTitleHy: 'Դասընկեր',
        textEs: '¿Cuándo te viene bien quedar?',
        textHy: 'Ե՞րբ է քեզ հարմար հանդիպել։',
        promptHy: 'Առաջարկիր կոնկրետ օր և ժամ',
        modelAnswerEs: 'El viernes por la tarde sobre las cinco, ¿te parece bien? Porque el jueves tengo entrenamiento.',
        modelAnswerHy: 'Ուրբաթ կեսօրից հետո՝ մոտ ժամը հինգին, ի՞նչ կասես։ Որովհետև հինգշաբթի մարզում ունեմ։',
      },
      {
        speaker: 'A',
        roleTitleEs: 'Compañero',
        roleTitleHy: 'Դասընկեր',
        textEs: 'Perfecto. ¿Dónde quedamos?',
        textHy: 'Հիանալի։ Որտե՞ղ հանդիպենք։',
        promptHy: 'Առաջարկիր վայր (գրադարան կամ տուն)',
        modelAnswerEs: 'Podemos ir a la biblioteca municipal que es muy tranquila, o a mi casa si prefieres.',
        modelAnswerHy: 'Կարող ենք գնալ քաղաքային գրադարան, որտեղ շատ հանգիստ է, կամ իմ տուն, եթե նախընտրում ես։',
      },
    ],
  },
  {
    id: 'e1-p4-3',
    titleEs: 'Conversación 3. El entrenador cambia la posición',
    titleHy: 'Երկխոսություն 3. Մարզիչը փոխում է դիրքը',
    turns: [
      {
        speaker: 'A',
        roleTitleEs: 'Entrenador',
        roleTitleHy: 'Մարզիչ',
        textEs: 'Rafael, quiero que juegues de centrocampista.',
        textHy: 'Ռաֆայե՛լ, ուզում եմ, որ կիսապաշտպան խաղաս։',
        promptHy: 'Ընդունիր մարտահրավերը և հարցրու',
        modelAnswerEs: 'Vale, míster. Aunque suelo jugar de delantero, daré lo mejor de mí ahí.',
        modelAnswerHy: 'Լավ, մարզի՛չ։ Թեև սովորաբար հարձակվող եմ խաղում, այնտեղ էլ կտամ իմ առավելագույնը։',
      },
      {
        speaker: 'A',
        roleTitleEs: 'Entrenador',
        roleTitleHy: 'Մարզիչ',
        textEs: 'Necesito que ayudes a los defensas y pases rápido. ¿Entendido?',
        textHy: 'Պետք է օգնես պաշտպաններին և արագ փոխանցես։ Հասկացա՞ր։',
        promptHy: 'Հաստատիր, որ հասկացար առաջադրանքը',
        modelAnswerEs: '¡Entendido perfectamente! Bajaré a recuperar balones y jugaré a un toque.',
        modelAnswerHy: 'Հասկացա՛ կատարելապես։ Կիջնեմ գնդակ խլելու և մեկ հպումով կփոխանցեմ։',
      },
      {
        speaker: 'A',
        roleTitleEs: 'Entrenador',
        roleTitleHy: 'Մարզիչ',
        textEs: 'Si ves espacio, puedes avanzar y tirar a puerta.',
        textHy: 'Եթե ազատ տարածություն տեսնես, կարող ես առաջ շարժվել և հարվածել դարպասին։',
        promptHy: 'Շնորհակալություն հայտնիր վստահության համար',
        modelAnswerEs: 'Genial, gracias por la confianza míster. ¡Vamos a ganar este partido!',
        modelAnswerHy: 'Հիանալի է, շնորհակալություն վստահության համար, մարզիչ։ Եկեք հաղթենք այս խաղը։',
      },
    ],
  },
  {
    id: 'e1-p4-4',
    titleEs: 'Conversación 4. Después de perder un partido',
    titleHy: 'Երկխոսություն 4. Պարտությունից հետո',
    turns: [
      {
        speaker: 'A',
        roleTitleEs: 'Compañero de equipo',
        roleTitleHy: 'Թիմակից',
        textEs: 'Vaya, qué rabia. Hemos perdido en el último minuto.',
        textHy: 'Ափսո՜ս, ինչ նյարդայնացնող է։ Վերջին րոպեին պարտվեցինք։',
        promptHy: 'Հանգստացրու և ոգևորիր ընկերոջդ',
        modelAnswerEs: 'Sí, ha sido una pena, pero hemos jugado con muchas ganas y lo hemos dado todo.',
        modelAnswerHy: 'Այո, ափսոս էր, բայց մենք մեծ եռանդով խաղացինք և ամեն ինչ տվեցինք։',
      },
      {
        speaker: 'A',
        roleTitleEs: 'Compañero de equipo',
        roleTitleHy: 'Թիմակից',
        textEs: 'Además, he fallado una ocasión clarísima.',
        textHy: 'Բացի այդ, ես շատ լավ գոլային հնարավորություն բաց թողեցի։',
        promptHy: 'Մի մեղադրիր, աջակցիր',
        modelAnswerEs: 'No te comas la cabeza, cualquiera puede fallar. En el próximo partido meterás dos.',
        modelAnswerHy: 'Մի՛ տանջիր քեզ, յուրաքանչյուրն էլ կարող է վրիպել։ Հաջորդ խաղում երկու գոլ կխփես։',
      },
      {
        speaker: 'A',
        roleTitleEs: 'Compañero de equipo',
        roleTitleHy: 'Թիմակից',
        textEs: '¿Qué podemos hacer para jugar mejor la próxima vez?',
        textHy: 'Ի՞նչ կարող ենք անել, որպեսզի հաջորդ անգամ ավելի լավ խաղանք։',
        promptHy: 'Առաջարկիր լուծումներ մարզումների համար',
        modelAnswerEs: 'Tenemos que entrenar más la puntería y mantener la concentración hasta el pitido final.',
        modelAnswerHy: 'Պետք է ավելի շատ մարզենք դիպուկությունը և պահպանենք կենտրոնացումը մինչև վերջին սուլիչը։',
      },
    ],
  },
];

export const EXAM_1_PARTE_5: ExamItem[] = [
  {
    id: 'e1-p5-1',
    number: 1,
    spanish: 'A: ¿Qué hiciste ayer después de clase?\nB: Ayer jugué con mis amigos.',
    armenian: 'Երեկ դասերից հետո ի՞նչ արեցիր։ — Երեկ ընկերներիս հետ խաղացի։',
    notes: 'jugar -> Indefinido (jugué)',
    grammarTense: 'Pretérito Indefinido',
    modelAnswerSpanish: 'Ayer jugué con mis amigos.',
    modelAnswerArmenian: 'Երեկ ընկերներիս հետ խաղացի։',
  },
  {
    id: 'e1-p5-2',
    number: 2,
    spanish: 'A: ¿Jugabas al fútbol cuando eras pequeño?\nB: Sí, antes entrenaba casi todos los días.',
    armenian: 'Փոքր ժամանակ ֆուտբոլ խաղո՞ւմ էիր։ — Այո, առաջ գրեթե ամեն օր մարզվում էի։',
    notes: 'entrenar -> Imperfecto (entrenaba)',
    grammarTense: 'Pretérito Imperfecto',
    modelAnswerSpanish: 'Sí, antes entrenaba casi todos los días.',
    modelAnswerArmenian: 'Այո, առաջ գրեթե ամեն օր մարզվում էի։',
  },
  {
    id: 'e1-p5-3',
    number: 3,
    spanish: 'A: ¿Has terminado el trabajo de ciencias?\nB: Sí, ya lo he terminado.',
    armenian: 'Բնագիտության նախագիծն ավարտե՞լ ես։ — Այո, արդեն ավարտել եմ։',
    notes: 'terminar -> Perfecto (he terminado)',
    grammarTense: 'Pretérito Perfecto Compuesto',
    modelAnswerSpanish: 'Sí, ya lo he terminado.',
    modelAnswerArmenian: 'Այո, արդեն ավարտել եմ։',
  },
  {
    id: 'e1-p5-4',
    number: 4,
    spanish: 'A: ¿Qué harás mañana después del entrenamiento?\nB: Iré a casa y haré los deberes.',
    armenian: 'Ի՞նչ կանես վաղը մարզումից հետո։ — Կգնամ տուն և կանեմ տնայինները։',
    notes: 'ir, hacer -> Futuro (iré, haré)',
    grammarTense: 'Futuro Simple',
    modelAnswerSpanish: 'Iré a casa y haré los deberes.',
    modelAnswerArmenian: 'Կգնամ տուն և կանեմ տնայինները։',
  },
  {
    id: 'e1-p5-5',
    number: 5,
    spanish: 'A: ¿Qué harías si tu equipo perdiera la final?\nB: Estaría triste, pero seguiría entrenando.',
    armenian: 'Ի՞նչ կանեիր, եթե թիմդ պարտվեր եզրափակչում։ — Տխուր կլինեի, բայց կշարունակեի մարզվել։',
    notes: 'estar, seguir -> Condicional (estaría, seguiría)',
    grammarTense: 'Condicional Simple',
    modelAnswerSpanish: 'Estaría triste, pero seguiría entrenando.',
    modelAnswerArmenian: 'Տխուր կլինեի, բայց կշարունակեի մարզվել։',
  },
  {
    id: 'e1-p5-6',
    number: 6,
    spanish: 'A: ¿Qué quieres que haga tu compañero?\nB: Quiero que me pase el balón.',
    armenian: 'Ի՞նչ ես ուզում, որ թիմակիցդ անի։ — Ուզում եմ, որ գնդակն ինձ փոխանցի։',
    notes: 'pasar -> Presente de Subjuntivo (pase)',
    grammarTense: 'Presente de Subjuntivo',
    modelAnswerSpanish: 'Quiero que me pase el balón.',
    modelAnswerArmenian: 'Ուզում եմ, որ գնդակն ինձ փոխանցի։',
  },
  {
    id: 'e1-p5-7',
    number: 7,
    spanish: 'A: ¿Qué estabas haciendo cuando te llamé?\nB: Hacía los deberes y no escuché el móvil.',
    armenian: 'Ի՞նչ էիր անում, երբ քեզ զանգահարեցի։ — Տնայիններն էի անում և չլսեցի հեռախոսը։',
    notes: 'hacer, escuchar -> Imperfecto / Indefinido (hacía, no escuché)',
    grammarTense: 'Imperfecto + Indefinido',
    modelAnswerSpanish: 'Hacía los deberes y no escuché el móvil.',
    modelAnswerArmenian: 'Տնայիններն էի անում և չլսեցի հեռախոսը։',
  },
  {
    id: 'e1-p5-8',
    number: 8,
    spanish: 'A: ¿Qué esperas que pase en el próximo partido?\nB: Espero que juguemos bien y que ganemos.',
    armenian: 'Ի՞նչ ես հույս ունենում, որ տեղի կունենա հաջորդ խաղում։ — Հույս ունեմ, որ լավ կխաղանք և կհաղթենք։',
    notes: 'jugar, ganar -> Subjuntivo nosotros (juguemos, ganemos)',
    grammarTense: 'Subjuntivo (nosotros)',
    modelAnswerSpanish: 'Espero que juguemos bien y que ganemos.',
    modelAnswerArmenian: 'Հույս ունեմ, որ լավ կխաղանք և կհաղթենք։',
  },
];

export const EXAM_1_PARTE_6: SurpriseSituation[] = [
  {
    id: 'e1-p6-1',
    step: 1,
    total: 4,
    titleEs: 'Llega un alumno nuevo a tu clase',
    titleHy: 'Քո դասարան նոր աշակերտ է եկել',
    instructionsHy: 'Ողջունի՛ր նրան, ներկայացի՛ր և հարցրո՛ւ՝ արդյոք օգնության կարիք ունի։ (2–3 նախադասություն և 1 հարց)',
    modelSpeechEs: '¡Hola! Bienvenido a nuestra clase. Me llamo Tigran y llevo tres años en este colegio. Si necesitas cualquier cosa, como encontrar las aulas o saber qué libros usamos, dímelo sin problema.',
    modelSpeechHy: 'Ողջո՛ւյն։ Բարի գալուստ մեր դասարան։ Անունս Տիգրան է, և ես արդեն երեք տարի է՝ սովորում եմ այս դպրոցում։ Եթե որևէ բանի կարիք ունենաս՝ գտնել լսարանները կամ իմանալ ինչ գրքեր ենք օգտագործում, առանց քաշվելու ասա՛ ինձ։',
    modelQuestionEs: '¿Quieres que te enseñe el patio durante el recreo?',
    modelQuestionHy: 'Կուզե՞ս դասամիջոցին քեզ ցույց տամ բակը։',
  },
  {
    id: 'e1-p6-2',
    step: 2,
    total: 4,
    titleEs: 'Has perdido las llaves de casa',
    titleHy: 'Տան բանալիները կորցրել ես',
    instructionsHy: 'Բացատրիր իրավիճակը դասընկերոջդ, ասա որտեղ կարող էիր մոռացած լինել և հարցրու օգնություն։',
    modelSpeechEs: '¡Menudo lío! Creo que he perdido las llaves de mi casa después de la clase de educación física. Las tenía en el bolsillo del chándal y ahora no están por ninguna parte.',
    modelSpeechHy: 'Ի՜նչ խառնաշփոթ է։ Կարծում եմ՝ ֆիզկուլտուրայի դասից հետո տանս բանալիները կորցրել եմ։ Դրանք սպորտային համազգեստիս գրպանում էին, իսկ հիմա ոչ մի տեղ չկան։',
    modelQuestionEs: '¿Me puedes acompañar a los vestuarios a ver si siguen allí?',
    modelQuestionHy: 'Կարո՞ղ ես ինձ հետ գալ հանդերձարան՝ տեսնելու արդյոք դեռ այնտե՞ղ են։',
  },
  {
    id: 'e1-p6-3',
    step: 3,
    total: 4,
    titleEs: 'El árbitro pita un penalti injusto en contra de tu equipo',
    titleHy: 'Մրցավարը անարդար 11-մետրանոց է նշանակում ձեր դեմ',
    instructionsHy: 'Հանգստացրու թիմակիցներիդ, խոսիր մարզչի ցուցումով և պահպանիր հավաքվածությունը։',
    modelSpeechEs: '¡Tranquilos todos, no le gritéis al árbitro que nos va a sacar tarjeta! Ha sido un choque involuntario, pero ya no va a cambiar su decisión. Ahora tenemos que apoyar al portero.',
    modelSpeechHy: 'Հանգստացե՛ք բոլորդ, մրցավարի վրա մի՛ գոռացեք, թե չէ դեղին քարտ կտա։ Դա ակամա բախում էր, բայց նա արդեն որոշումը չի փոխի։ Հիմա պետք է աջակցենք դարպասապահին։',
    modelQuestionEs: '¿Confiamos en nuestro portero para pararlo?',
    modelQuestionHy: 'Հավատո՞ւմ ենք մեր դարպասապահին, որ կկասեցնի այն։',
  },
  {
    id: 'e1-p6-4',
    step: 4,
    total: 4,
    titleEs: 'Tu mejor amigo no te habla después del partido',
    titleHy: 'Լավագույն ընկերդ խաղից հետո քեզ հետ չի խոսում',
    instructionsHy: 'Մոտեցիր նրան դպրոցի բակում, հարցրու պատճառը և հարթիր թյուրիմացությունը։',
    modelSpeechEs: 'Oye, he notado que estás serio y no me has dicho nada desde que acabó el partido. Si estás enfadado porque no te pasé el balón en aquella jugada, te aseguro que fue sin querer.',
    modelSpeechHy: 'Լսի՛ր, նկատել եմ, որ լուրջ ես և խաղի ավարտից հետո ոչ մի բան չես ասել ինձ։ Եթե նեղացած ես այն դրվագում քեզ գնդակ չփոխանցելու պատճառով, վստահեցնում եմ՝ առանց դիտավորության էր։',
    modelQuestionEs: '¿Podemos hablar cinco minutos y dejar las cosas claras?',
    modelQuestionHy: 'Կարո՞ղ ենք հինգ րոպե խոսել և ամեն ինչ պարզաբանել։',
  },
];

export const FRASES_EMERGENCIA: EmergencyPhrase[] = [
  {
    id: 'fe-1',
    spanish: 'A ver, déjame pensar.',
    armenian: 'Սպասի՛ր, մտածեմ։',
    usageContext: 'Երբ քեզ մի քանի վայրկյան է պետք պատասխանը ձևակերպելու համար։',
  },
  {
    id: 'fe-2',
    spanish: 'No sé cómo decirlo.',
    armenian: 'Չգիտեմ՝ ինչպես ասել։',
    usageContext: 'Երբ միտքը գիտես, բայց բառը մոռացել ես։',
  },
  {
    id: 'fe-3',
    spanish: 'Lo que quiero decir es que…',
    armenian: 'Ուզում եմ ասել, որ…',
    usageContext: 'Երբ ցանկանում ես հստակեցնել կամ վերաձևակերպել միտքդ։',
  },
  {
    id: 'fe-4',
    spanish: 'Me he liado un poco.',
    armenian: 'Մի քիչ խառնվեցի։',
    usageContext: 'Երբ սխալվել ես նախադասության կառուցվածքում և ուզում ես նորից սկսել։',
  },
  {
    id: 'fe-5',
    spanish: '¿Me das una pista?',
    armenian: 'Կարո՞ղ ես հուշում տալ։',
    usageContext: 'Ուսուցչից կամ զրուցակցից թեթև ակնարկ կամ առաջին բառը խնդրելու համար։',
  },
  {
    id: 'fe-6',
    spanish: 'No estoy muy seguro, pero…',
    armenian: 'Այնքան էլ վստահ չեմ, բայց…',
    usageContext: 'Երբ ենթադրություն ես անում կամ կարծիք ես հայտնում։',
  },
  {
    id: 'fe-7',
    spanish: '¿A qué te refieres?',
    armenian: 'Ի՞նչ նկատի ունես։',
    usageContext: 'Երբ հարցը կամ նախադասությունը լիարժեք չես հասկացել։',
  },
  {
    id: 'fe-8',
    spanish: 'Ahora caigo.',
    armenian: 'Հիմա հասկացա։',
    usageContext: 'Իսպանական շատ բնական խոսակցական արտահայտություն, երբ հանկարծ հասկանում ես իմաստը։',
  },
  {
    id: 'fe-9',
    spanish: '¿Y tú qué harías?',
    armenian: 'Իսկ դու ի՞նչ կանեիր։',
    usageContext: 'Զրույցը շարունակելու և գնդակը դիմացինի դաշտ նետելու հիանալի միջոց։',
  },
  {
    id: 'fe-10',
    spanish: 'Espera, que ya me acuerdo.',
    armenian: 'Սպասի՛ր, արդեն հիշում եմ։',
    usageContext: 'Երբ մտաբերում ես մոռացածդ բառը կամ պատասխանը։',
  },
  {
    id: 'fe-11',
    spanish: 'Pues yo creo que…',
    armenian: 'Դե, ես կարծում եմ, որ…',
    usageContext: 'Բնական խոսակցական ներածություն սեփական կարծիքը հայտնելիս։',
  },
  {
    id: 'fe-12',
    spanish: 'Te lo explico de otra manera.',
    armenian: 'Ուրիշ ձևով կբացատրեմ։',
    usageContext: 'Երբ քեզ չհասկացան առաջին փորձից։',
  },
];

// ---------------- EXAMEN 2 ----------------

export const EXAM_2_INFO = {
  id: 'examen-2',
  titleEs: 'EXAMEN ORAL 2 — ¡Habla como en España!',
  titleHy: 'Իսպաներենի խոսակցական քննություն 2 — Խոսի՛ր ինչպես Իսպանիայում',
  subtitleHy: '7.º curso · A2–B1 · 50 actividades · 100 puntos',
  descriptionHy:
    'Նոր խոսակցական քննություն՝ 7-րդ դասարանի համար։ Այս անգամ ավելի շատ իրական իրավիճակներ՝ դասընկերների հետ շփում, ֆուտբոլային խաղ, ընկերական վեճեր, անսպասելի հարցեր և արագ պատասխաններ։',
  totalPoints: 100,
  totalActivities: 50,
  instructionsEs: 'El profesor lee la pregunta o situación. El alumno responde en español. Las respuestas preparadas están disponibles con traducción al armenio.',
  instructionsHy: 'Ուսուցիչը կարդում է հարցը կամ իրավիճակը։ Աշակերտը պատասխանում է իսպաներեն։ Պատրաստի պատասխանները տրված են հայերեն թարգմանությամբ։',
};

export const EXAM_2_PARTE_1: ExamItem[] = [
  {
    id: 'e2-p1-1',
    number: 1,
    speaker: 'Un compañero',
    spanish: '«Oye, ¿qué tenemos a última hora?»',
    armenian: 'Լսի՛ր, վերջին դասին ի՞նչ ունենք։',
    modelAnswerSpanish: 'Creo que tenemos Educación Física. ¿No has mirado el horario?',
    modelAnswerArmenian: 'Կարծում եմ՝ ֆիզկուլտուրա ունենք։ Դասացուցակը չե՞ս նայել։',
  },
  {
    id: 'e2-p1-2',
    number: 2,
    speaker: 'Un compañero',
    spanish: '«¿Me guardas un sitio?»',
    armenian: 'Ինձ համար տեղ կպահե՞ս։',
    modelAnswerSpanish: 'Sí, claro. Pero date prisa, que ya viene el profesor.',
    modelAnswerArmenian: 'Այո՛, իհարկե։ Բայց շտապի՛ր, որովհետև ուսուցիչն արդեն գալիս է։',
  },
  {
    id: 'e2-p1-3',
    number: 3,
    speaker: 'Un amigo',
    spanish: '«¿Tú has entendido lo de matemáticas?»',
    armenian: 'Դու հասկացե՞լ ես մաթեմատիկայի թեման։',
    modelAnswerSpanish: 'Más o menos. La primera parte sí, pero la última no me ha quedado clara.',
    modelAnswerArmenian: 'Քիչ թե շատ։ Առաջին մասը՝ այո, բայց վերջին մասը լավ չեմ հասկացել։',
  },
  {
    id: 'e2-p1-4',
    number: 4,
    speaker: 'Un compañero',
    spanish: '«¿Por qué no has salido al recreo?»',
    armenian: 'Ինչո՞ւ դասամիջոցին դուրս չես եկել։',
    modelAnswerSpanish: 'Me he quedado terminando un trabajo. Ya casi he acabado.',
    modelAnswerArmenian: 'Մնացել եմ՝ մի աշխատանք ավարտելու։ Արդեն գրեթե ավարտել եմ։',
  },
  {
    id: 'e2-p1-5',
    number: 5,
    speaker: 'Un amigo',
    spanish: '«¿Te ha dicho algo el profe?»',
    armenian: 'Ուսուցիչը քեզ ինչ-որ բան ասե՞լ է։',
    modelAnswerSpanish: 'Sí, me ha dicho que tengo que participar más en clase.',
    modelAnswerArmenian: 'Այո՛, ասել է, որ պետք է դասերին ավելի ակտիվ մասնակցեմ։',
  },
  {
    id: 'e2-p1-6',
    number: 6,
    speaker: 'Un compañero',
    spanish: '«¡Qué aburrida ha sido la clase!»',
    armenian: 'Ի՜նչ ձանձրալի դաս էր։',
    modelAnswerSpanish: 'Ya ves. Se me ha hecho larguísima.',
    modelAnswerArmenian: 'Հա՛, ճիշտ ես ասում։ Ինձ թվաց՝ դասը վերջ չունի։',
  },
  {
    id: 'e2-p1-7',
    number: 7,
    speaker: 'Un amigo',
    spanish: '«¿Vienes a comer con nosotros?»',
    armenian: 'Գալի՞ս ես մեզ հետ ուտելու։',
    modelAnswerSpanish: '¡Vale! Esperadme, que tengo que guardar mis cosas.',
    modelAnswerArmenian: 'Լա՛վ։ Սպասե՛ք, պետք է իրերս հավաքեմ։',
  },
  {
    id: 'e2-p1-8',
    number: 8,
    speaker: 'Un compañero',
    spanish: '«¡Me han cambiado de sitio!»',
    armenian: 'Իմ նստելու տեղը փոխել են։',
    modelAnswerSpanish: '¿Ah, sí? ¿Y dónde te han puesto ahora?',
    modelAnswerArmenian: 'Լո՞ւրջ։ Իսկ հիմա որտե՞ղ են քեզ նստեցրել։',
  },
  {
    id: 'e2-p1-9',
    number: 9,
    speaker: 'Un amigo',
    spanish: '«¿Sabes si mañana hay examen?»',
    armenian: 'Գիտե՞ս՝ վաղը քննություն կա՞։',
    modelAnswerSpanish: 'Que yo sepa, no. Pero mejor preguntamos al profesor.',
    modelAnswerArmenian: 'Ինչքան գիտեմ՝ ոչ։ Բայց ավելի լավ է ուսուցչին հարցնենք։',
  },
  {
    id: 'e2-p1-10',
    number: 10,
    speaker: 'Un compañero',
    spanish: '«¿Me explicas esto en el recreo?»',
    armenian: 'Դասամիջոցին սա ինձ կբացատրե՞ս։',
    modelAnswerSpanish: 'Claro, si quieres lo vemos juntos. No parece muy difícil.',
    modelAnswerArmenian: 'Իհարկե՛, եթե ուզում ես, միասին կնայենք։ Այնքան էլ դժվար չի թվում։',
  },
];

export const EXAM_2_PARTE_2: ExamItem[] = [
  {
    id: 'e2-p2-11',
    number: 11,
    speaker: 'Tu compañero',
    spanish: '«¡Pásamela, que estoy solo!»',
    armenian: 'Փոխանցի՛ր ինձ, ազատ եմ։',
    modelAnswerSpanish: '¡Ahí va! ¡Controla y tira!',
    modelAnswerArmenian: 'Ահա՛, փոխանցեցի։ Ընդունի՛ր և հարվածի՛ր։',
  },
  {
    id: 'e2-p2-12',
    number: 12,
    speaker: 'El entrenador',
    spanish: '«¿Por qué no estás presionando?»',
    armenian: 'Ինչո՞ւ ճնշում չես գործադրում մրցակցի վրա։',
    modelAnswerSpanish: '¡Voy, míster! Estaba cubriendo al delantero.',
    modelAnswerArmenian: 'Հիմա՛, մարզիչ։ Ես հսկում էի հարձակվողին։',
  },
  {
    id: 'e2-p2-13',
    number: 13,
    speaker: 'Tu compañero',
    spanish: '«¡Cuidado, tienes uno detrás!»',
    armenian: 'Զգո՛ւյշ, քո հետևում մրցակից կա։',
    modelAnswerSpanish: '¡Vale! ¡Me la quito de encima!',
    modelAnswerArmenian: 'Լա՛վ։ Հենց հիմա ազատվում եմ գնդակից։',
  },
  {
    id: 'e2-p2-14',
    number: 14,
    speaker: 'El entrenador',
    spanish: '«¡Abre el campo!»',
    armenian: 'Լայնացրո՛ւ խաղը։',
    modelAnswerSpanish: '¡Entendido! Me voy hacia la banda.',
    modelAnswerArmenian: 'Հասկացա՛։ Գնում եմ դեպի եզրային գիծը։',
  },
  {
    id: 'e2-p2-15',
    number: 15,
    speaker: 'Tu compañero',
    spanish: '«¡Déjamela, que llego yo!»',
    armenian: 'Թո՛ղ ինձ, ես կհասնեմ գնդակին։',
    modelAnswerSpanish: '¡Tuya, tuya! ¡Dale!',
    modelAnswerArmenian: 'Քո՛նն է, քո՛նն է։ Առա՛ջ։',
  },
  {
    id: 'e2-p2-16',
    number: 16,
    speaker: 'El entrenador',
    spanish: '«¿Puedes seguir o necesitas un cambio?»',
    armenian: 'Կարո՞ղ ես շարունակել, թե՞ փոխարինման կարիք ունես։',
    modelAnswerSpanish: 'Puedo seguir, míster. Estoy bien.',
    modelAnswerArmenian: 'Կարող եմ շարունակել, մարզիչ։ Լավ եմ։',
  },
  {
    id: 'e2-p2-17',
    number: 17,
    speaker: 'Tu compañero',
    spanish: '«¡Has fallado una ocasión clarísima!»',
    armenian: 'Շատ լավ գոլային հնարավորություն բաց թողեցիր։',
    modelAnswerSpanish: 'Ya lo sé, tío. La próxima no fallo.',
    modelAnswerArmenian: 'Գիտեմ, ախպե՛ր։ Հաջորդ անգամ չեմ վրիպի։',
  },
  {
    id: 'e2-p2-18',
    number: 18,
    speaker: 'El entrenador',
    spanish: '«¡Quiero que juegues más rápido!»',
    armenian: 'Ուզում եմ, որ ավելի արագ խաղաս։',
    modelAnswerSpanish: '¡Vale! Intentaré jugar a uno o dos toques.',
    modelAnswerArmenian: 'Լա՛վ։ Կփորձեմ մեկ կամ երկու հպումով խաղալ։',
  },
  {
    id: 'e2-p2-19',
    number: 19,
    speaker: 'Tu compañero',
    spanish: '«¿A quién marco?»',
    armenian: 'Ո՞ւմ հսկեմ։',
    modelAnswerSpanish: '¡Marca al número nueve! ¡Yo cubro al otro!',
    modelAnswerArmenian: 'Հսկի՛ր իններորդ համարին։ Ես մյուսին կհսկեմ։',
  },
  {
    id: 'e2-p2-20',
    number: 20,
    speaker: 'El entrenador',
    spanish: '«¿Qué podemos mejorar en la segunda parte?»',
    armenian: 'Ի՞նչ կարող ենք բարելավել երկրորդ խաղակեսում։',
    modelAnswerSpanish: 'Tenemos que pasar más rápido y hablar más entre nosotros.',
    modelAnswerArmenian: 'Պետք է ավելի արագ փոխանցումներ կատարենք և ավելի շատ հաղորդակցվենք։',
  },
];

export const EXAM_2_PARTE_3: ExamItem[] = [
  {
    id: 'e2-p3-21',
    number: 21,
    spanish: '— Oye, ¡me he dejado la mochila en clase!',
    armenian: 'Վա՜յ, պայուսակս դասարանում եմ թողել։',
    options: [
      { text: '¡Pues vuelve a por ella!', armenian: 'Դե գնա՛ ետևից վերցրու։', isCorrect: true },
      { text: '¡Buen gol!', armenian: 'Լավ գո՛լ էր։', isCorrect: false },
      { text: 'Estoy en primero.', armenian: 'Առաջին դասարանում եմ։', isCorrect: false },
    ],
    explanation: 'Բնական արձագանքը վերադառնալն ու վերցնելն է («¡Pues vuelve a por ella!»)։',
  },
  {
    id: 'e2-p3-22',
    number: 22,
    spanish: '— ¿Me echas una mano con este ejercicio?',
    armenian: 'Կօգնե՞ս ինձ այս վարժության հարցում։',
    options: [
      { text: 'Ayer hacía frío.', armenian: 'Երեկ ցուրտ էր։', isCorrect: false },
      { text: 'Claro, a ver qué tienes que hacer.', armenian: 'Իհարկե, տեսնենք ինչ պետք է անես։', isCorrect: true },
      { text: 'No tengo hambre.', armenian: 'Սոված չեմ։', isCorrect: false },
    ],
    explanation: '«Echar una mano» նշանակում է օգնել։ Պատասխան՝ «Claro, a ver qué tienes que hacer.»։',
  },
  {
    id: 'e2-p3-23',
    number: 23,
    spanish: '— ¿Por qué no me has pasado el balón?',
    armenian: 'Ինչո՞ւ գնդակն ինձ չփոխանցեցիր։',
    options: [
      { text: 'Mañana hay examen.', armenian: 'Վաղը քննություն կա։', isCorrect: false },
      { text: '¡Felicidades!', armenian: 'Շնորհավորում եմ։', isCorrect: false },
      { text: 'Es que no te había visto.', armenian: 'Բանն այն է, որ քեզ չէի տեսել։', isCorrect: true },
    ],
    explanation: 'Արդարացում ֆուտբոլային իրավիճակում՝ «Es que no te había visto.» (Չէի տեսել)։',
  },
  {
    id: 'e2-p3-24',
    number: 24,
    spanish: '— ¡Creo que mañana suspendemos todos!',
    armenian: 'Կարծում եմ՝ վաղը բոլորս կձախողենք քննությունը։',
    options: [
      { text: 'No seas tan negativo. ¡Hemos estudiado!', armenian: 'Այդքան վատատես մի՛ եղիր։ Սովորել ենք։', isCorrect: true },
      { text: 'Tengo una bicicleta.', armenian: 'Հեծանիվ ունեմ։', isCorrect: false },
      { text: 'Estoy en el campo.', armenian: 'Դաշտում եմ։', isCorrect: false },
    ],
    explanation: 'Ուսումնական լավատեսական աջակցություն՝ «No seas tan negativo. ¡Hemos estudiado!»։',
  },
  {
    id: 'e2-p3-25',
    number: 25,
    spanish: '— Tío, ¿estás enfadado conmigo?',
    armenian: 'Ախպե՛ր, ինձնից նեղացա՞ծ ես։',
    options: [
      { text: 'Hace buen tiempo.', armenian: 'Լավ եղանակ է։', isCorrect: false },
      { text: 'Un poco, pero podemos hablarlo.', armenian: 'Մի քիչ, բայց կարող ենք խոսել այդ մասին։', isCorrect: true },
      { text: 'Tengo clase ayer.', armenian: 'Երեկ դաս ունեմ (անհեթեթ)։', isCorrect: false },
    ],
    explanation: 'Անկեղծ և հասուն պատասխան՝ «Un poco, pero podemos hablarlo.»։',
  },
  {
    id: 'e2-p3-26',
    number: 26,
    spanish: '— ¿Has visto el mensaje que te mandé?',
    armenian: 'Տեսե՞լ ես իմ ուղարկած հաղորդագրությունը։',
    options: [
      { text: 'Voy al cine mañana.', armenian: 'Վաղը կինո եմ գնում։', isCorrect: false },
      { text: 'Seis euros, por favor.', armenian: 'Վեց եվրո, խնդրեմ։', isCorrect: false },
      { text: 'Sí, pero todavía no he podido responder.', armenian: 'Այո, բայց դեռ չեմ կարողացել պատասխանել։', isCorrect: true },
    ],
    explanation: 'Տրամաբանական արձագանք՝ «Sí, pero todavía no he podido responder.»։',
  },
  {
    id: 'e2-p3-27',
    number: 27,
    spanish: '— ¡Hemos ganado el partido!',
    armenian: 'Մենք հաղթել ենք խաղում։',
    options: [
      { text: '¡Vamos! ¡Qué partidazo!', armenian: 'Առա՛ջ։ Ի՜նչ հրաշալի խաղ էր։', isCorrect: true },
      { text: 'Lo siento muchísimo.', armenian: 'Շատ եմ ցավում։', isCorrect: false },
      { text: 'Necesito un boli.', armenian: 'Գրիչ է պետք։', isCorrect: false },
    ],
    explanation: 'Հաղթանակի ցնծություն՝ «¡Vamos! ¡Qué partidazo!»։',
  },
  {
    id: 'e2-p3-28',
    number: 28,
    spanish: '— ¿Puedes explicármelo otra vez?',
    armenian: 'Կարո՞ղ ես նորից բացատրել։',
    options: [
      { text: 'No pasa mañana.', armenian: 'Վաղը չի անցնում։', isCorrect: false },
      { text: 'Sí, claro. Mira, es así...', armenian: 'Այո, իհարկե։ Նայի՛ր, այսպես է...', isCorrect: true },
      { text: 'Estoy doce años.', armenian: 'Տասներկու տարեկան եմ (քերականական սխալ)։', isCorrect: false },
    ],
    explanation: 'Բացատրելու պատրաստակամություն՝ «Sí, claro. Mira, es así...»։',
  },
  {
    id: 'e2-p3-29',
    number: 29,
    spanish: '— ¿Qué harías tú en mi lugar?',
    armenian: 'Դու ի՞նչ կանեիր իմ փոխարեն։',
    options: [
      { text: 'Ayer estudio.', armenian: 'Երեկ սովորում եմ։', isCorrect: false },
      { text: 'Estoy muy alto.', armenian: 'Շատ բարձրահասակ եմ։', isCorrect: false },
      { text: 'Yo hablaría con él primero.', armenian: 'Ես նախ կխոսեի նրա հետ։', isCorrect: true },
    ],
    explanation: 'Պայմանական եղանակի խորհուրդ՝ «Yo hablaría con él primero.»։',
  },
  {
    id: 'e2-p3-30',
    number: 30,
    spanish: '— ¿Te importa que juguemos aquí?',
    armenian: 'Դեմ չե՞ս, եթե այստեղ խաղանք։',
    options: [
      { text: 'No, para nada. Hay sitio de sobra.', armenian: 'Ոչ, բոլորովին։ Տեղը լիքն է։', isCorrect: true },
      { text: 'Soy jugar mañana.', armenian: 'Ես վաղը խաղալ եմ։', isCorrect: false },
      { text: 'Ayer iré contigo.', armenian: 'Երեկ կգնամ քեզ հետ։', isCorrect: false },
    ],
    explanation: 'Համաձայնություն տալը՝ «No, para nada. Hay sitio de sobra.»։',
  },
];

export const EXAM_2_PARTE_4: RolePlayDialogue[] = [
  {
    id: 'e2-p4-31',
    titleEs: '31. Antes del examen — Քննությունից առաջ',
    titleHy: 'Քննությունից առաջ',
    turns: [
      {
        speaker: 'A',
        roleTitleEs: 'Compañero',
        roleTitleHy: 'Դասընկեր',
        textEs: '¡Tío, estoy nerviosísimo!',
        textHy: 'Ախպե՛ր, շատ լարված եմ։',
        promptHy: 'Հանգստացրու նրան',
        modelAnswerEs: 'Tranquilo, respira hondo. Siempre te pones nervioso y luego sacas buenas notas.',
        modelAnswerHy: 'Հանգստացի՛ր, խորը շունչ քաշիր։ Միշտ լարվում ես, իսկ հետո լավ գնահատական ես ստանում։',
      },
      {
        speaker: 'A',
        roleTitleEs: 'Compañero',
        roleTitleHy: 'Դասընկեր',
        textEs: 'Es que no he estudiado suficiente.',
        textHy: 'Բանն այն է, որ բավականաչափ չեմ սովորել։',
        promptHy: 'Առաջարկիր արագ կրկնել',
        modelAnswerEs: 'Bueno, todavía nos quedan diez minutos. ¿Quieres que repasemos juntos las preguntas clave?',
        modelAnswerHy: 'Դե, դեռ տասը րոպե ունենք։ Կուզե՞ս միասին կրկնենք գլխավոր հարցերը։',
      },
      {
        speaker: 'A',
        roleTitleEs: 'Compañero',
        roleTitleHy: 'Դասընկեր',
        textEs: '¿Crees que aprobaré?',
        textHy: 'Կարծո՞ւմ ես՝ կհանձնեմ։',
        promptHy: 'Վստահություն ներշնչիր',
        modelAnswerEs: '¡Seguro que sí! Confía en ti y concéntrate en lo que sabes bien.',
        modelAnswerHy: 'Հաստա՛տ կհանձնես։ Հավատա՛ ինքդ քեզ ու կենտրոնացիր նրա վրա, ինչ լավ գիտես։',
      },
    ],
  },
  {
    id: 'e2-p4-32',
    titleEs: '32. Durante el entrenamiento — Մարզման ընթացքում',
    titleHy: 'Մարզման ընթացքում',
    turns: [
      {
        speaker: 'A',
        roleTitleEs: 'Compañero',
        roleTitleHy: 'Թիմակից',
        textEs: '¿Qué te pasa hoy? Estás jugando muy despistado.',
        textHy: 'Այսօր ի՞նչ է քեզ հետ։ Շատ անուշադիր ես խաղում։',
        promptHy: 'Բացատրիր պատճառը',
        modelAnswerEs: 'Es verdad, perdona. He tenido un día duro en clase y tengo muchas cosas en la cabeza.',
        modelAnswerHy: 'Ճիշտ ես, կներես։ Դպրոցում ծանր օր էր, ու շատ մտքեր կան գլխումս։',
      },
      {
        speaker: 'A',
        roleTitleEs: 'Compañero',
        roleTitleHy: 'Թիմակից',
        textEs: 'Pues tienes que concentrarte más.',
        textHy: 'Դե պետք է ավելի շատ կենտրոնանաս։',
        promptHy: 'Խոստացիր ուղղվել',
        modelAnswerEs: 'Tienes razón. Me cambio el chip ahora mismo y me pongo al cien por cien.',
        modelAnswerHy: 'Իրավացի ես։ Հենց հիմա փոխում եմ տրամադրվածությունս ու հարյուր տոկոսով նվիրվում խաղին։',
      },
      {
        speaker: 'A',
        roleTitleEs: 'Compañero',
        roleTitleHy: 'Թիմակից',
        textEs: 'Vale, pero avísame si necesitas descansar.',
        textHy: 'Լավ, բայց ասա՛, եթե հանգստանալու կարիք ունենաս։',
        promptHy: 'Շնորհակալություն հայտնիր',
        modelAnswerEs: '¡Gracias, tío! Se agradece tener un compañero como tú en el equipo.',
        modelAnswerHy: 'Շնորհակալ եմ, ախպե՛ր։ Հաճելի է քեզ պես թիմակից ունենալ թիմում։',
      },
    ],
  },
  {
    id: 'e2-p4-33',
    titleEs: '33. Un malentendido — Թյուրիմացություն',
    titleHy: 'Թյուրիմացություն',
    turns: [
      {
        speaker: 'A',
        roleTitleEs: 'Amigo',
        roleTitleHy: 'Ընկեր',
        textEs: 'Oye, ¿por qué ayer no me saludaste?',
        textHy: 'Լսի՛ր, երեկ ինչո՞ւ ինձ չբարևեցիր։',
        promptHy: 'Պարզաբանիր, որ չէիր նկատել',
        modelAnswerEs: '¿Ayer? ¡No te vi! Llevaba los auriculares puestos y salí con mucha prisa.',
        modelAnswerHy: 'Երե՞կ։ Չտեսա քեզ։ Ականջակալներս դրած էին ու շատ շտապ էի դուրս եկել։',
      },
      {
        speaker: 'A',
        roleTitleEs: 'Amigo',
        roleTitleHy: 'Ընկեր',
        textEs: 'Pues pensé que estabas enfadado conmigo.',
        textHy: 'Դե մտածեցի, որ ինձնից նեղացած ես։',
        promptHy: 'Հերքիր և հանգստացրու',
        modelAnswerEs: '¡Qué va! ¿Cómo me voy a enfadar contigo sin ningún motivo? Jamás.',
        modelAnswerHy: 'Էդ ի՞նչ ես ասում։ Ո՞նց քեզնից առանց որևէ պատճառի նեղանամ։ Երբե՛ք։',
      },
      {
        speaker: 'A',
        roleTitleEs: 'Amigo',
        roleTitleHy: 'Ընկեր',
        textEs: 'Ah, vale. Entonces no pasa nada.',
        textHy: 'Ա՜հ, լավ։ Ուրեմն խնդիր չկա։',
        promptHy: 'Առաջարկիր միասին ժամանակ անցկացնել',
        modelAnswerEs: 'Menos mal que lo hablamos. ¿Vamos a tomar algo después de clase?',
        modelAnswerHy: 'Լավ է, որ խոսեցինք։ Գնա՞նք դասերից հետո մի բան խմելու/ուտելու։',
      },
    ],
  },
  {
    id: 'e2-p4-34',
    titleEs: '34. Después de marcar un gol — Գոլ խփելուց հետո',
    titleHy: 'Գոլ խփելուց հետո',
    turns: [
      {
        speaker: 'A',
        roleTitleEs: 'Compañero',
        roleTitleHy: 'Թիմակից',
        textEs: '¡Qué golazo has metido!',
        textHy: 'Ի՜նչ հրաշալի գոլ խփեցիր։',
        promptHy: 'Կիսիր գովասանքը թիմի հետ',
        modelAnswerEs: '¡Gracias! Pero el mérito es de todo el equipo por la jugada.',
        modelAnswerHy: 'Շնորհակալ եմ։ Բայց արժանիքը ողջ թիմինն է այդ կոմբինացիայի համար։',
      },
      {
        speaker: 'A',
        roleTitleEs: 'Compañero',
        roleTitleHy: 'Թիմակից',
        textEs: '¿Cómo has conseguido superar a los dos defensas?',
        textHy: 'Ինչպե՞ս կարողացար անցնել երկու պաշտպաններին։',
        promptHy: 'Պատմիր քո հնարքի մասին',
        modelAnswerEs: 'Hice un regate rápido hacia la derecha y vi que el portero estaba descolocado.',
        modelAnswerHy: 'Արագ շրջանցում արեցի դեպի աջ և տեսա, որ դարպասապահը սխալ դիրքում էր։',
      },
      {
        speaker: 'A',
        roleTitleEs: 'Compañero',
        roleTitleHy: 'Թիմակից',
        textEs: '¡Pues sigue así!',
        textHy: 'Դե շարունակիր այդպես։',
        promptHy: 'Կոչ արա թիմին հաղթելու',
        modelAnswerEs: '¡Claro que sí! ¡Vamos a por otro gol antes del descanso!',
        modelAnswerHy: 'Իհարկե՛։ Եկեք ևս մեկ գոլ խփենք մինչև ընդմիջում։',
      },
    ],
  },
];

export const EXAM_2_PARTE_5: ExamItem[] = [
  {
    id: 'e2-p5-41',
    number: 41,
    spanish: '¿Qué solías hacer durante el recreo cuando estabas en primaria?',
    armenian: 'Ի՞նչ էիր սովորաբար անում դասամիջոցին, երբ տարրական դպրոցում էիր։',
    notes: 'Tiempo: Imperfecto de hábito (solía / jugaba)',
    modelAnswerSpanish: 'Cuando estaba en primaria, siempre jugaba al pilla-pilla con mis amigos o al fútbol con una pelota de plástico.',
    modelAnswerArmenian: 'Երբ տարրական դպրոցում էի, ընկերներիս հետ միշտ բռնոցի էի խաղում կամ պլաստիկե գնդակով ֆուտբոլ։',
  },
  {
    id: 'e2-p5-42',
    number: 42,
    spanish: '¿Has discutido alguna vez con un compañero por un partido?',
    armenian: 'Երբևէ խաղի պատճառով վիճե՞լ ես դասընկերոջդ հետ։',
    notes: 'Tiempo: Pretérito Perfecto Compuesto (he discutido / nos hemos enfadado)',
    modelAnswerSpanish: 'Sí, alguna vez he discutido por una falta, pero después del partido siempre nos damos la mano y nos olvidamos.',
    modelAnswerArmenian: 'Այո, երբեմն վիճել եմ խախտման պատճառով, բայց խաղից հետո միշտ սեղմում ենք ձեռքերը և մոռանում։',
  },
  {
    id: 'e2-p5-43',
    number: 43,
    spanish: '¿Qué hiciste la última vez que llegaste tarde al entrenamiento?',
    armenian: 'Ի՞նչ արեցիր, երբ վերջին անգամ ուշացար մարզումից։',
    notes: 'Tiempo: Pretérito Indefinido (pedí perdón / corrí)',
    modelAnswerSpanish: 'Le pedí perdón al entrenador, le expliqué que el autobús se había retrasado y me puse a calentar enseguida.',
    modelAnswerArmenian: 'Ներողություն խնդրեցի մարզչից, բացատրեցի, որ ավտոբուսն ուշացել էր, և անմիջապես սկսեցի նախավարժանքը։',
  },
  {
    id: 'e2-p5-44',
    number: 44,
    spanish: '¿Qué estabas haciendo cuando empezó el partido por la tele?',
    armenian: 'Ի՞նչ էիր անում, երբ հեռուստացույցով խաղը սկսվեց։',
    notes: 'Tiempo: Pasado continuo (estaba cenando / haciendo deberes)',
    modelAnswerSpanish: 'Estaba terminando de cenar en la cocina y corrí al salón para no perderme el saque inicial.',
    modelAnswerArmenian: 'Խոհանոցում ընթրիքս էի ավարտում և վազեցի հյուրասենյակ, որպեսզի բաց չթողնեմ մեկնարկային հարվածը։',
  },
  {
    id: 'e2-p5-45',
    number: 45,
    spanish: '¿Qué harás si un compañero nuevo quiere jugar con vosotros?',
    armenian: 'Ի՞նչ կանես, եթե նոր դասընկերը ցանկանա ձեզ հետ խաղալ։',
    notes: 'Tiempo: Futuro simple (le invitaré / le pasaré)',
    modelAnswerSpanish: 'Le invitaré a nuestro equipo con mucho gusto y le pasaré el balón para que se sienta cómodo desde el primer momento.',
    modelAnswerArmenian: 'Մեծ հաճույքով նրան կհրավիրեմ մեր թիմ և գնդակը կփոխանցեմ իրեն, որպեսզի առաջին պահից իրեն հարմարավետ զգա։',
  },
  {
    id: 'e2-p5-46',
    number: 46,
    spanish: '¿Qué harías si fueras el capitán del equipo?',
    armenian: 'Ի՞նչ կանեիր, եթե թիմի ավագը լինեիր։',
    notes: 'Tiempo: Condicional Simple (animaría / hablaría)',
    modelAnswerSpanish: 'Animaría a todos los compañeros cuando cometen un error y hablaría con el árbitro siempre con respeto.',
    modelAnswerArmenian: 'Կոգևորեի բոլոր թիմակիցներին, երբ նրանք սխալվում են, և մրցավարի հետ միշտ հարգանքով կխոսեի։',
  },
  {
    id: 'e2-p5-47',
    number: 47,
    spanish: '¿Qué quieres que haga tu entrenador para ayudarte a mejorar?',
    armenian: 'Ի՞նչ ես ուզում, որ մարզիչդ անի, որպեսզի օգնի քեզ զարգանալ։',
    notes: 'Tiempo: Subjuntivo (quiera que me corrija / ponga)',
    modelAnswerSpanish: 'Quiero que me corrija cuando me coloco mal en el campo y que me ponga más ejercicios de tiro con la pierna izquierda.',
    modelAnswerArmenian: 'Ուզում եմ, որ նա ուղղի ինձ, երբ դաշտում սխալ դիրք եմ ընդունում, և ավելի շատ ձախ ոտքով հարվածի վարժություններ տա։',
  },
  {
    id: 'e2-p5-48',
    number: 48,
    spanish: '¿Qué esperas haber aprendido al final de este curso?',
    armenian: 'Ի՞նչ ես հույս ունենում սովորած լինել ուսումնական տարվա վերջում։',
    notes: 'Tiempo: Infinitivo compuesto (haber aprendido a hablar)',
    modelAnswerSpanish: 'Espero haber mejorado mi fluidez en español para poder charlar con cualquier persona sin tener que pensarlo tanto.',
    modelAnswerArmenian: 'Հույս ունեմ բարելաված լինել իսպաներենի սահունությունս, որպեսզի կարողանամ զրուցել ցանկացած մարդու հետ առանց երկար մտածելու։',
  },
  {
    id: 'e2-p5-49',
    number: 49,
    spanish: '¿Qué habrías hecho si tu compañero se hubiera lesionado?',
    armenian: 'Ի՞նչ կանեիր, եթե թիմակիցդ վնասվածք ստացած լիներ։',
    notes: 'Tiempo: Condicional Compuesto (habría parado el juego)',
    modelAnswerSpanish: 'Habría echado el balón fuera inmediatamente para que entraran los médicos a atenderlo.',
    modelAnswerArmenian: 'Անմիջապես գնդակը դուրս կհանեի խաղադաշտից, որպեսզի բժիշկները ներս մտնեին օգնելու նրան։',
  },
  {
    id: 'e2-p5-50',
    number: 50,
    spanish: '¿Qué te gustaría que cambiaran en tu colegio?',
    armenian: 'Ի՞նչ կցանկանայիր, որ փոխեին քո դպրոցում։',
    notes: 'Tiempo: Imperfecto de Subjuntivo (pusieran / ampliaran)',
    modelAnswerSpanish: 'Me gustaría que pusieran césped artificial en el patio de recreo y que tuviéramos más minutos para comer.',
    modelAnswerArmenian: 'Կցանկանայի, որ դասամիջոցի բակում արհեստական խոտածածկ դնեին և ճաշելու համար ավելի շատ րոպեներ ունենայինք։',
  },
];

export const BONUS_EXPRESIONES: EmergencyPhrase[] = [
  {
    id: 'b-1',
    spanish: '¿Me echas una mano?',
    armenian: 'Կօգնե՞ս մի քիչ։',
    usageContext: 'Օգտագործվում է ոչ ֆորմալ իրավիճակներում օգնություն խնդրելիս։',
  },
  {
    id: 'b-2',
    spanish: '¡Menudo partidazo!',
    armenian: 'Ի՜նչ հրաշալի խաղ էր։',
    usageContext: 'Հիացմունք արտահայտելիս հիանալի ֆուտբոլային խաղի մասին։',
  },
  {
    id: 'b-3',
    spanish: '¡Me has dado un susto!',
    armenian: 'Վախեցրի՛ր ինձ։',
    usageContext: 'Երբ ինչ-որ մեկը հանկարծակի մոտենում է կամ բղավում։',
  },
  {
    id: 'b-4',
    spanish: '¡No me lo esperaba!',
    armenian: 'Չէի սպասում։',
    usageContext: 'Անակնկալի գալու ժամանակ։',
  },
  {
    id: 'b-5',
    spanish: 'Me he quedado en blanco.',
    armenian: 'Միտքս լրիվ դատարկվեց։',
    usageContext: 'Երբ քննության ժամանակ հանկարծ ոչինչ չես հիշում։',
  },
  {
    id: 'b-6',
    spanish: 'No me sale.',
    armenian: 'Չի ստացվում։',
    usageContext: 'Երբ վարժությունը կամ հնարքը չի հաջողվում։',
  },
  {
    id: 'b-7',
    spanish: 'A mí también me pasa.',
    armenian: 'Ինձ հետ էլ է այդպես պատահում։',
    usageContext: 'Համակրանք և աջակցություն հայտնելիս ընկերոջը։',
  },
  {
    id: 'b-8',
    spanish: '¡Ya era hora!',
    armenian: 'Վերջապե՜ս։',
    usageContext: 'Երբ երկար սպասված բանը վերջապես տեղի է ունենում։',
  },
  {
    id: 'b-9',
    spanish: '¡Por los pelos!',
    armenian: 'Հազիվ-հազ։',
    usageContext: 'Երբ վերջին վայրկյանին խուսափեցիր վտանգից կամ ուշացումից։',
  },
  {
    id: 'b-10',
    spanish: '¡Qué mala suerte!',
    armenian: 'Ի՜նչ անհաջողություն։',
    usageContext: 'Ափսոսանքի բացականչություն։',
  },
  {
    id: 'b-11',
    spanish: 'Se me ha pasado el tiempo volando.',
    armenian: 'Ժամանակը շատ արագ անցավ։',
    usageContext: 'Երբ դասը կամ խաղը շատ հետաքրքիր էր և արագ անցավ։',
  },
  {
    id: 'b-12',
    spanish: '¿Nos ponemos juntos?',
    armenian: 'Միասի՞ն կանգնենք / տեղավորվենք։',
    usageContext: 'Զույգով աշխատելու կամ նույն նստարանին նստելու առաջարկ։',
  },
  {
    id: 'b-13',
    spanish: '¿Te toca a ti o a mí?',
    armenian: 'Քո՞ հերթն է, թե՞ իմը։',
    usageContext: 'Խաղի կամ պատասխանելու հերթը ճշտելիս։',
  },
  {
    id: 'b-14',
    spanish: 'No te lo tomes a mal.',
    armenian: 'Վատ մի՛ ընդունիր։',
    usageContext: 'Երբ կատակում ես կամ դիտողություն ես անում ընկերական ձևով։',
  },
  {
    id: 'b-15',
    spanish: '¡Así se hace!',
    armenian: 'Ահա այսպե՛ս է պետք։',
    usageContext: 'Քաջալերանք և գովեստ ճիշտ կատարված գործողության համար։',
  },
];

export function getEvaluationFeedback(points: number): { textEs: string; textHy: string; color: string } {
  if (points >= 90) {
    return {
      textEs: '¡Sobresaliente! — Hablas con fluidez y naturalidad.',
      textHy: 'Գերազանց — Խոսում ես սահուն և շատ բնական։',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
    };
  }
  if (points >= 70) {
    return {
      textEs: 'Notable — Muy buena comunicación y vocabulario.',
      textHy: 'Լավ — Շատ լավ հաղորդակցություն և բառապաշար։',
      color: 'text-blue-700 bg-blue-50 border-blue-300',
    };
  }
  if (points >= 50) {
    return {
      textEs: 'Aprobado — Buen esfuerzo, puedes responder con soltura.',
      textHy: 'Բավարար — Լավ ջանք, կարող ես պատասխանել հիմնականում։',
      color: 'text-amber-700 bg-amber-50 border-amber-300',
    };
  }
  return {
    textEs: 'Necesita más práctica — ¡Sigue entrenando!',
    textHy: 'Ավելի շատ պրակտիկա է պետք — Շարունակի՛ր պարապել։',
    color: 'text-rose-700 bg-rose-50 border-rose-300',
  };
}
