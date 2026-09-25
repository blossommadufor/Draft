export const SAMPLE_STUDY_SETS = [{
        id: 'os-csc308',
        title: 'CSC308: Operating Systems & Disk Scheduling',
        subject: 'Computer Science',
        university: 'University of Lagos',
        createdAt: '2026-09-24T14:20:00Z',
        cardCount: 16,
        quizCount: 8,
        masteryRate: 75,
        topics: [
            'Disk Scheduling Algorithms (FCFS, SSTF, SCAN, C-SCAN)',
            'Virtual Memory & Paging Mechanisms',
            'Deadlock Prevention & Banker Algorithm',
            'Process Synchronization & Semaphores',
            'File System Implementation & Inodes'
        ],
        summary: {
            overview: 'Comprehensive breakdown of modern operating system kernels, focusing on secondary storage optimization, concurrent process synchronization, and virtual memory translation.',
            keyPoints: [
                'Disk scheduling algorithms aim to minimize seek time and rotational latency when accessing physical magnetic drives.',
                'SSTF (Shortest Seek Time First) chooses requests nearest the current head position, but can cause starvation of peripheral cylinders.',
                'C-SCAN (Circular SCAN) provides more uniform wait times than standard SCAN by servicing requests in one direction only and immediately returning without servicing on the return trip.',
                'Thrashing occurs when the page fault frequency becomes excessively high, spending more time swapping pages than executing instructions.',
                'Banker\'s Algorithm safely evaluates resource allocation state matrices to prevent deadlock conditions.'
            ],
            examTips: [
                'Always calculate total head movement by summing the absolute distance between consecutive seek requests.',
                'Remember that C-SCAN does NOT service cylinders during its rapid reset to cylinder 0.',
                'Differentiate between Preemptive and Non-Preemptive scheduling for multi-core architectures in section B questions.'
            ],
            cheatSheet: [
                { concept: 'SSTF', formula: 'Min(|Current_Cylinder - Target_Cylinder|)', note: 'Vulnerable to starvation' },
                { concept: 'SCAN (Elevator)', formula: 'Services in current sweep direction to end boundary', note: 'Biased towards middle cylinders' },
                { concept: 'C-SCAN', formula: 'Circular sweep in one direction, fast return', note: 'Most uniform wait distribution' }
            ]
        },
        flashcards: [{
                id: 'fc-1',
                term: 'C-SCAN Scheduling',
                definition: 'Circular SCAN algorithm that services disk requests in one direction only, and jumps back to the opposite edge without servicing requests on the return pass to guarantee uniform wait times.',
                hint: 'Think elevator returning empty to the ground floor.',
                tag: 'Disk I/O',
                mastered: true
            },
            {
                id: 'fc-2',
                term: 'SSTF (Shortest Seek Time First)',
                definition: 'Disk scheduling strategy that always selects the pending I/O request closest to the current read/write head position, minimizing average seek time at the risk of request starvation.',
                hint: 'Greedy approach based on physical cylinder distance.',
                tag: 'Disk I/O',
                mastered: false
            },
            {
                id: 'fc-3',
                term: 'Belady\'s Anomaly',
                definition: 'The counter-intuitive phenomenon where increasing the number of page frames available in physical RAM results in an increase in the number of page faults for certain FIFO page replacement sequences.',
                hint: 'FIFO paradox where more memory leads to worse performance.',
                tag: 'Virtual Memory',
                mastered: true
            },
            {
                id: 'fc-4',
                term: 'Banker\'s Algorithm',
                definition: 'A deadlock avoidance algorithm developed by Edsger Dijkstra that tests for safety by simulating the allocation of predetermined maximum possible amounts of all resources.',
                hint: 'Checks if a safe sequence of processes exists before granting resources.',
                tag: 'Deadlock',
                mastered: false
            },
            {
                id: 'fc-5',
                term: 'Translation Lookaside Buffer (TLB)',
                definition: 'A high-speed hardware associative cache used by the Memory Management Unit (MMU) to store recent virtual-to-physical address translations and avoid double RAM lookups.',
                hint: 'Hardware cache for page tables.',
                tag: 'Virtual Memory',
                mastered: false
            },
            {
                id: 'fc-6',
                term: 'Counting Semaphore',
                definition: 'A concurrency synchronization primitive whose integer value can range over an unrestricted domain, representing the count of available identical shared resources.',
                hint: 'Contrasted with binary semaphores/mutexes which only hold 0 or 1.',
                tag: 'Concurrency',
                mastered: true
            }
        ],
        quiz: [{
                id: 'q-1',
                question: 'Which disk scheduling algorithm minimizes average seek time but can lead to starvation for distant cylinders?',
                options: [
                    'First-Come, First-Served (FCFS)',
                    'Shortest Seek Time First (SSTF)',
                    'C-SCAN',
                    'LOOK'
                ],
                answer: 'Shortest Seek Time First (SSTF)',
                explanation: 'SSTF always selects the request with the minimum seek distance from the current head position. Because the head remains close to clusters of requests, cylinders far away can starve indefinitely if new local requests continually arrive.',
                difficulty: 'Medium'
            },
            {
                id: 'q-2',
                question: 'What is the primary advantage of C-SCAN over traditional SCAN (Elevator) disk scheduling?',
                options: [
                    'It completely eliminates rotational latency.',
                    'It provides a more uniform waiting time across all cylinder requests.',
                    'It requires zero memory buffer in the disk controller.',
                    'It eliminates mechanical arm movement altogether.'
                ],
                answer: 'It provides a more uniform waiting time across all cylinder requests.',
                explanation: 'In SCAN, requests near the boundaries wait longer on average than requests near the center. C-SCAN treats cylinders as a circular list, returning without servicing to start again, equalizing the average wait time across all track positions.',
                difficulty: 'Hard'
            },
            {
                id: 'q-3',
                question: 'Under which page replacement algorithm does Belady\'s Anomaly typically manifest?',
                options: [
                    'Least Recently Used (LRU)',
                    'Optimal Page Replacement (OPT)',
                    'First-In, First-Out (FIFO)',
                    'Least Frequently Used (LFU)'
                ],
                answer: 'First-In, First-Out (FIFO)',
                explanation: 'Belady\'s Anomaly is a phenomenon where giving a process more page frames increases page faults. It occurs in FIFO because FIFO does not belong to the class of stack algorithms (unlike LRU or OPT).',
                difficulty: 'Medium'
            },
            {
                id: 'q-4',
                question: 'Which condition is NOT one of Coffman\'s four necessary conditions for deadlock to occur?',
                options: [
                    'Mutual Exclusion',
                    'Hold and Wait',
                    'Preemptive Scheduling',
                    'Circular Wait'
                ],
                answer: 'Preemptive Scheduling',
                explanation: 'The four Coffman conditions are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Preemptive scheduling actually helps BREAK deadlock, because resources can be forcibly reclaimed.',
                difficulty: 'Easy'
            }
        ]
    },
    {
        id: 'bio-anat201',
        title: 'ANAT201: Cardiovascular System & Hemodynamics',
        subject: 'Medicine & Health Sciences',
        university: 'Covenant University',
        createdAt: '2026-09-22T09:15:00Z',
        cardCount: 24,
        quizCount: 10,
        masteryRate: 90,
        topics: [
            'Cardiac Conduction System & Action Potentials',
            'Cardiac Cycle Phases & Pressure-Volume Loops',
            'Frank-Starling Law of the Heart',
            'Arterial Blood Pressure Regulation',
            'Capillary Fluid Exchange & Starling Forces'
        ],
        summary: {
            overview: 'Systematic study of mammalian cardiovascular physiology, myocardial electrophysiology, ventricular mechanics, and neurohumoral blood pressure homeostasis.',
            keyPoints: [
                'The SA node acts as the intrinsic cardiac pacemaker with spontaneous diastolic depolarization (funny sodium current If).',
                'The AV node introduces a physiological delay (~0.1s) allowing complete atrial emptying before ventricular systole begins.',
                'According to the Frank-Starling Law, stroke volume increases in proportion to end-diastolic volume (preload) due to optimal actin-myosin cross-bridge overlap.',
                'Mean Arterial Pressure (MAP) is approximated as Diastolic BP + 1/3(Systolic BP - Diastolic BP).'
            ],
            examTips: [
                'Memorize the difference in action potential phases between pacemaker tissue (SA/AV nodes) vs ventricular myocytes.',
                'High-yield topic: Starling forces governing capillary edema formation (Hydrostatic vs Oncotic pressure).'
            ],
            cheatSheet: [
                { concept: 'Cardiac Output', formula: 'CO = HR × SV', note: 'Normal resting: ~5 L/min' },
                { concept: 'MAP Approximation', formula: 'MAP = DBP + 1/3(PP)', note: 'PP = SBP - DBP' }
            ]
        },
        flashcards: [{
                id: 'bio-1',
                term: 'Frank-Starling Mechanism',
                definition: 'The intrinsic property of the heart whereby the force of ventricular contraction is directly proportional to the initial muscle fiber length (preload) at end-diastole.',
                hint: 'Greater stretch yields stronger snap.',
                tag: 'Ventricular Mechanics',
                mastered: true
            },
            {
                id: 'bio-2',
                term: 'Pacemaker Potential (If Current)',
                definition: 'A hyperpolarization-activated inward sodium current (funny current) through HCN channels in the sinoatrial node responsible for automaticity and spontaneous depolarization.',
                hint: 'Funny current activated by hyperpolarization.',
                tag: 'Electrophysiology',
                mastered: true
            },
            {
                id: 'bio-3',
                term: 'Isovolumetric Contraction',
                definition: 'The earliest phase of ventricular systole where ventricles contract with both AV and semilunar valves firmly shut, causing rapid intraventricular pressure rise without volume change.',
                hint: 'All valves closed, tension spikes.',
                tag: 'Cardiac Cycle',
                mastered: true
            }
        ],
        quiz: [{
            id: 'bq-1',
            question: 'What physiological event accounts for the PR interval delay on an electrocardiogram (ECG)?',
            options: [
                'Depolarization of the Bundle of His',
                'Slowing of electrical conduction through the AV node',
                'Delayed opening of aortic semilunar valves',
                'Repolarization of ventricular myocardium'
            ],
            answer: 'Slowing of electrical conduction through the AV node',
            explanation: 'The AV node fibers have smaller diameters and fewer gap junctions, purposefully slowing conduction by ~0.10s so atrial contraction can finish filling the ventricles prior to ventricular systole.',
            difficulty: 'Medium'
        }]
    }
]