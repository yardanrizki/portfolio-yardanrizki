import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting portfolio seed...");

  // ============================================================
  // ADMIN USER
  // ============================================================

  const passwordHash = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "ChangeThisPassword123!",
    12
  );

  const user = await prisma.user.upsert({
    where: {
      email: "yardanrizki@gmail.com",
    },
    update: {},
    create: {
      email: "yardanrizki@gmail.com",
      username: "yardanrizki",
      passwordHash,
    },
  });

  console.log(`✅ User: ${user.email}`);

  // ============================================================
  // PERSONAL INFORMATION
  // ============================================================

  await prisma.personalInfo.upsert({
    where: {
      userId: user.id,
    },
    update: {},
    create: {
      userId: user.id,

      fullName: "Muhammad Rizki",

      email: "yardanrizki@gmail.com",
      phone: "0823-2092-3148",
      location: "Medan, Sumatera Utara",

      headlineEn:
        "Informatics Engineering graduate with interests in web development, embedded systems, and data processing.",

      headlineId:
        "Lulusan Teknik Informatika dengan ketertarikan pada pengembangan web, sistem tertanam, dan pengolahan data.",

      summaryEn:
        "Informatics Engineering graduate from Universitas Prima Indonesia with a GPA of 3.82, with experience in programming projects, scientific publications, organizational activities, and programming and robotics instruction. Adaptable to new technologies and able to work independently or collaboratively.",

      summaryId:
        "Lulusan S1 Teknik Informatika Universitas Prima Indonesia dengan IPK 3.82 yang memiliki ketertarikan mendalam pada bidang pengembangan web, sistem tertanam, dan pengolahan data. Berpengalaman dalam proyek pemrograman, penulisan publikasi ilmiah, kegiatan organisasi, serta pengajaran pemrograman dan robotik. Memiliki kemampuan komunikasi yang baik, adaptif terhadap teknologi baru, serta dapat bekerja secara mandiri maupun dalam tim.",

      linkedinUrl: "https://www.linkedin.com/in/yardanrizki",
    },
  });

  console.log("✅ Personal information");

  // ============================================================
  // PROFILES
  // ============================================================

  const generalProfile = await prisma.profile.upsert({
    where: {
      slug: "general",
    },
    update: {},
    create: {
      userId: user.id,
      slug: "general",
      name: "General Profile",
      type: "GENERAL",

      headlineEn:
        "Informatics Engineering Graduate | Web Development | Embedded Systems | Data",

      headlineId:
        "Lulusan Teknik Informatika | Web Development | Sistem Tertanam | Data",

      summaryEn:
        "Informatics Engineering graduate with experience across web development, embedded systems, data processing, scientific research, and technical instruction.",

      summaryId:
        "Lulusan Teknik Informatika dengan pengalaman dalam pengembangan web, sistem tertanam, pengolahan data, penelitian ilmiah, dan pengajaran teknis.",

      sortOrder: 0,
    },
  });

  const webProfile = await prisma.profile.upsert({
    where: {
      slug: "software-web-development",
    },
    update: {},
    create: {
      userId: user.id,
      slug: "software-web-development",
      name: "Software & Web Development",
      type: "DOMAIN",
      roleLabel: "Software / Web Developer",

      headlineEn:
        "Software & Web Development",

      headlineId:
        "Pengembangan Software & Web",

      summaryEn:
        "Focused on web and mobile application development using modern programming technologies.",

      summaryId:
        "Berfokus pada pengembangan aplikasi web dan mobile menggunakan berbagai teknologi pemrograman.",

      sortOrder: 1,
    },
  });

  const aiProfile = await prisma.profile.upsert({
    where: {
      slug: "ai-data-science",
    },
    update: {},
    create: {
      userId: user.id,
      slug: "ai-data-science",
      name: "AI & Data Science",
      type: "DOMAIN",
      roleLabel: "AI / Data",

      headlineEn:
        "AI, Data Science & Scientific Computing",

      headlineId:
        "AI, Data Science & Komputasi Ilmiah",

      summaryEn:
        "Experience in machine learning research, ECG arrhythmia classification, CNN, SVM, and data processing.",

      summaryId:
        "Berpengalaman dalam penelitian machine learning, klasifikasi aritmia ECG, CNN, SVM, dan pengolahan data.",

      sortOrder: 2,
    },
  });

  const iotProfile = await prisma.profile.upsert({
    where: {
      slug: "iot-embedded",
    },
    update: {},
    create: {
      userId: user.id,
      slug: "iot-embedded",
      name: "IoT & Embedded Systems",
      type: "DOMAIN",
      roleLabel: "IoT / Embedded",

      headlineEn:
        "IoT, Embedded Systems & Robotics",

      headlineId:
        "IoT, Sistem Tertanam & Robotik",

      summaryEn:
        "Experience with Arduino, microcontrollers, sensors, robotics programming, and embedded systems.",

      summaryId:
        "Berpengalaman dengan Arduino, mikrokontroler, sensor, pemrograman robotik, dan sistem tertanam.",

      sortOrder: 3,
    },
  });

  console.log("✅ Profiles created");

  // ============================================================
  // EXPERIENCE
  // ============================================================

  const binusCenter = await prisma.experience.create({
    data: {
      userId: user.id,

      companyName: "Binus Center Medan",
      location: "Medan, Indonesia",

      roleTitleEn: "Instructor",
      roleTitleId: "Pengajar (Instruktur)",

      employmentType: "OTHER",

      startDate: new Date("2026-06-01"),
      endDate: new Date("2026-08-31"),
      isCurrent: false,

      descriptionEn:
        "Taught CFS Robotic Programming & Microcontroller with Arduino.",

      descriptionId:
        "Mengajar kelas CFS Robotic Programming & Microcontroller with Arduino.",

      responsibilities: [
        "Teaching robotics programming and microcontroller concepts.",
        "Guiding participants in robotics programming projects.",
        "Explaining Arduino and microcontroller concepts.",
        "Guiding final projects.",
        "Evaluating participant competencies.",
        "Coordinating with academic management.",
      ],

      isActive: true,
      sortOrder: 0,
    },
  });

  const internship = await prisma.experience.create({
    data: {
      userId: user.id,

      companyName:
        "Dinas PMD & Dukcapil Provinsi Sumatera Utara",
      location: "Sumatera Utara, Indonesia",

      roleTitleEn: "Intern",
      roleTitleId: "Peserta Magang",

      employmentType: "INTERNSHIP",

      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-07-31"),
      isCurrent: false,

      descriptionEn:
        "Supported administrative operations, data archiving, official correspondence, public services, and basic hardware maintenance.",

      descriptionId:
        "Mendukung kegiatan administrasi perkantoran, pengarsipan data, penyusunan surat resmi, layanan masyarakat, serta pemeliharaan perangkat keras.",

      responsibilities: [
        "Supporting office administration.",
        "Archiving data.",
        "Preparing official correspondence.",
        "Supporting public services.",
        "Maintaining computer hardware.",
        "Troubleshooting basic computer and printer issues.",
      ],

      isActive: true,
      sortOrder: 1,
    },
  });

  const organization = await prisma.experience.create({
    data: {
      userId: user.id,

      companyName:
        "Pemuda Muslimin Indonesia Sumatera Utara",
      location: "Sumatera Utara, Indonesia",

      roleTitleEn:
        "Vice Secretary of Organizational Cadre Development",
      roleTitleId:
        "Wakil Sekretaris Bidang OKK",

      employmentType: "ORGANIZATION",

      startDate: new Date("2025-01-01"),
      endDate: new Date("2030-12-31"),
      isCurrent: true,

      descriptionEn:
        "Supports membership administration and organizational cadre development programs at the provincial level.",

      descriptionId:
        "Mengelola administrasi keanggotaan dan mendukung program pengembangan kaderisasi organisasi di tingkat provinsi.",

      responsibilities: [
        "Managing membership administration.",
        "Supporting cadre development programs.",
        "Coordinating organizational activities.",
        "Supporting planning and implementation of provincial-level activities.",
      ],

      isActive: true,
      sortOrder: 2,
    },
  });

  console.log("✅ Experiences created");

  // ============================================================
  // EXPERIENCE ↔ PROFILE
  // ============================================================

  await prisma.profileExperience.createMany({
    data: [
      {
        profileId: generalProfile.id,
        experienceId: binusCenter.id,
        isIncluded: true,
        sortOrder: 0,
      },
      {
        profileId: generalProfile.id,
        experienceId: internship.id,
        isIncluded: true,
        sortOrder: 1,
      },
      {
        profileId: generalProfile.id,
        experienceId: organization.id,
        isIncluded: true,
        sortOrder: 2,
      },

      {
        profileId: iotProfile.id,
        experienceId: binusCenter.id,
        isIncluded: true,
        sortOrder: 0,
      },

      {
        profileId: webProfile.id,
        experienceId: internship.id,
        isIncluded: true,
        sortOrder: 0,
      },

      {
        profileId: generalProfile.id,
        experienceId: organization.id,
        isIncluded: true,
        sortOrder: 2,
      },
    ],
    skipDuplicates: true,
  });

  // ============================================================
  // EDUCATION
  // ============================================================

  await prisma.education.createMany({
    data: [
      {
        userId: user.id,

        institution: "Universitas Prima Indonesia",
        degree: "S1",
        fieldOfStudy: "Teknik Informatika",

        startDate: new Date("2021-01-01"),
        endDate: new Date("2025-12-31"),

        gpa: "3.82 / 4.00",

        notes:
          "Fakultas Sains & Teknologi",

        sortOrder: 0,
      },

      {
        userId: user.id,

        institution: "Universitas Dipa Makassar",
        degree: "Pertukaran Mahasiswa Merdeka (PMM 3)",

        startDate: new Date("2023-09-01"),
        endDate: new Date("2024-02-29"),

        notes:
          "Program mobilitas pelajar untuk memperluas wawasan lintas kampus dan budaya serta mengambil mata kuliah lintas program studi.",

        sortOrder: 1,
      },
    ],
  });

  console.log("✅ Education created");

  // ============================================================
  // PUBLICATIONS
  // ============================================================

  await prisma.publication.createMany({
    data: [
      {
        userId: user.id,

        title:
          "Klasifikasi Aritmia pada Lansia Menggunakan Algoritma SVM",

        publisher:
          "Jurnal Informatika dan Komputer (JURIKOM)",

        publicationType: "JOURNAL",

        publishedDate: new Date("2025-08-01"),

        accreditation: "SINTA 3",

        descriptionId:
          "Penulis artikel ilmiah mengenai klasifikasi aritmia pada lansia menggunakan algoritma SVM.",

        descriptionEn:
          "Scientific article on arrhythmia classification in elderly patients using the SVM algorithm.",

        sortOrder: 0,
      },

      {
        userId: user.id,

        title:
          "Implementation of CNN-Based Arrhythmia Classification on Elderly ECG Data",

        publisher:
          "International AIMS Conference 2025 (IEEE)",

        publicationType: "CONFERENCE",

        publishedDate: new Date("2025-05-01"),

        descriptionId:
          "Pemakalah/presenter penelitian mengenai implementasi CNN untuk klasifikasi aritmia berdasarkan data ECG lansia.",

        descriptionEn:
          "Research presentation on the implementation of CNN-based arrhythmia classification using elderly ECG data.",

        sortOrder: 1,
      },
    ],
  });

  console.log("✅ Publications created");

  // ============================================================
  // CERTIFICATES
  // ============================================================

  await prisma.certificate.createMany({
    data: [
      {
        userId: user.id,

        titleEn:
          "Industrial Entrepreneurship Level 4",
        titleId:
          "Kewirausahaan Industri Jenjang 4",

        issuerEn: "BNSP",
        issuerId: "BNSP",

        issuedDate: new Date("2025-09-01"),
        expiryDate: new Date("2028-09-30"),

        type: "CERTIFICATION",

        sortOrder: 0,
      },

      {
        userId: user.id,

        titleEn:
          "Social Media Marketing Optimization Training",
        titleId:
          "Pelatihan Optimalisasi Pemasaran Melalui Media Sosial",

        issuerEn: "BBPVP Medan",
        issuerId: "BBPVP Medan",

        issuedDate: new Date("2025-10-01"),

        type: "TRAINING",

        sortOrder: 1,
      },

      {
        userId: user.id,

        titleEn:
          "Microsoft Certified: Azure Data Fundamentals",
        titleId:
          "Microsoft Certified: Azure Data Fundamentals",

        issuerEn: "Microsoft",
        issuerId: "Microsoft",

        issuedDate: new Date("2025-03-01"),

        type: "CERTIFICATION",

        sortOrder: 2,
      },

      {
        userId: user.id,

        titleEn:
          "Communication That Sells",
        titleId:
          "Workshop Communication That Sells",

        issuerEn:
          "eLearn.id x XL Axiata Future Leaders",

        issuerId:
          "eLearn.id x XL Axiata Future Leaders",

        issuedDate: new Date("2022-09-01"),

        type: "TRAINING",

        sortOrder: 3,
      },
    ],
  });

  console.log("✅ Certificates created");

  // ============================================================
  // SKILLS
  // ============================================================

  const skills = [
    // Web & Mobile
    ["HTML", "WEB_DEVELOPMENT"],
    ["CSS", "WEB_DEVELOPMENT"],
    ["JavaScript", "WEB_DEVELOPMENT"],
    ["PHP", "WEB_DEVELOPMENT"],
    ["MySQL", "DATABASE"],
    ["React.js", "WEB_DEVELOPMENT"],
    ["Next.js", "WEB_DEVELOPMENT"],
    ["CodeIgniter", "WEB_DEVELOPMENT"],
    ["Bootstrap", "WEB_DEVELOPMENT"],
    ["Flutter", "MOBILE_DEVELOPMENT"],

    // AI / Data / Embedded
    ["Python", "DATA_SCIENCE"],
    ["TensorFlow", "AI_MACHINE_LEARNING"],
    ["CNN", "AI_MACHINE_LEARNING"],
    ["SVM", "AI_MACHINE_LEARNING"],
    ["Mikrokontroler", "IOT"],
    ["Arduino", "IOT"],

    // Network & Devices
    ["TCP/IP", "OTHER"],
    ["Subnetting", "OTHER"],
    ["DHCP/DNS", "OTHER"],
    ["Cisco Packet Tracer", "OTHER"],
    ["Maintenance Komputer & Printer", "OTHER"],

    // Design & Productivity
    ["Canva", "DESIGN"],
    ["Adobe Photoshop", "DESIGN"],
    ["Adobe Premiere", "VIDEO_EDITING"],
    ["Microsoft Office", "PRODUCTIVITY"],
    ["Google Workspace", "PRODUCTIVITY"],

    // Soft skills
    ["Komunikasi", "SOFT_SKILLS"],
    ["Kerja Sama Tim", "SOFT_SKILLS"],
    ["Adaptasi", "SOFT_SKILLS"],
    ["Manajemen Waktu", "SOFT_SKILLS"],
    ["Pemecahan Masalah", "SOFT_SKILLS"],
  ] as const;

  const skillRecords = [];

  for (let i = 0; i < skills.length; i++) {
    const [name, category] = skills[i];

    const skill = await prisma.skill.create({
      data: {
        userId: user.id,
        name,
        category: category as any,
        sortOrder: i,
      },
    });

    skillRecords.push(skill);
  }

  console.log(`✅ ${skillRecords.length} skills created`);

  // ============================================================
  // LANGUAGES
  // ============================================================

  await prisma.spokenLanguage.createMany({
    data: [
      {
        userId: user.id,
        languageName: "Bahasa Indonesia",
        proficiency: "Native",
        sortOrder: 0,
      },
      {
        userId: user.id,
        languageName: "English",
        proficiency: "Working Proficiency",
        sortOrder: 1,
      },
    ],
  });

  // ============================================================
  // PROJECTS
  // ============================================================

  const inventoryProject = await prisma.project.create({
    data: {
      userId: user.id,

      titleEn:
        "Website Inventory Management Application",

      titleId:
        "Aplikasi Website Manajemen Barang",

      shortDescriptionEn:
        "Inventory management system for suppliers, incoming goods, and sales.",

      shortDescriptionId:
        "Sistem manajemen inventaris untuk mengelola supplier, pemasukan, dan penjualan barang.",

      longDescriptionEn:
        "Built an inventory management system using HTML, PHP, CSS, and CodeIgniter to manage supplier data, incoming goods, and sales.",

      longDescriptionId:
        "Membangun sistem manajemen inventaris menggunakan HTML, PHP, CSS, dan CodeIgniter untuk mengelola data supplier, pemasukan, serta penjualan barang.",

      techStack: [
        "HTML",
        "PHP",
        "CSS",
        "CodeIgniter",
      ],

      roleInProject: "Developer",

      status: "COMPLETED",

      sortOrder: 0,
    },
  });

  const qrProject = await prisma.project.create({
    data: {
      userId: user.id,

      titleEn:
        "QR Attendance Website",

      titleId:
        "Website Absensi QR",

      shortDescriptionEn:
        "QR-code-based attendance system for university students.",

      shortDescriptionId:
        "Sistem absensi berbasis kode QR untuk mahasiswa.",

      longDescriptionEn:
        "Developed a QR-code-based attendance website collaboratively as part of a team project.",

      longDescriptionId:
        "Mengembangkan sistem absensi berbasis kode QR bagi mahasiswa secara kolaboratif dalam tim.",

      techStack: [
        "Web Development",
        "QR Code",
      ],

      roleInProject: "Team Developer",

      status: "COMPLETED",

      sortOrder: 1,
    },
  });

  const mobileProject = await prisma.project.create({
    data: {
      userId: user.id,

      titleEn:
        "Mobile & Simple Utility Applications",

      titleId:
        "Aplikasi Mobile & Utilitas Sederhana",

      shortDescriptionEn:
        "Mobile chat application and Node.js-based timer utility.",

      shortDescriptionId:
        "Aplikasi chat mobile dan utilitas timer berbasis Node.js.",

      longDescriptionEn:
        "Created a mobile chat application using Flutter/Dart and a timer application using Node.js independently.",

      longDescriptionId:
        "Membuat aplikasi chat item seluler menggunakan Flutter/Dart, serta timer berbasis Node.js secara mandiri.",

      techStack: [
        "Flutter",
        "Dart",
        "Node.js",
      ],

      roleInProject: "Developer",

      status: "COMPLETED",

      sortOrder: 2,
    },
  });

  const iotProject = await prisma.project.create({
    data: {
      userId: user.id,

      titleEn:
        "IoT & Cloud-Based Systems",

      titleId:
        "Sistem Berbasis IoT & Cloud",

      shortDescriptionEn:
        "Cloud storage and automated smart-bin prototype using Arduino.",

      shortDescriptionId:
        "Penyimpanan cloud dan purwarupa tempat sampah otomatis menggunakan Arduino.",

      longDescriptionEn:
        "Designed cloud storage using Ubuntu Linux and VirtualBox and developed an automated smart-bin prototype using Arduino Uno and an ultrasonic sensor collaboratively.",

      longDescriptionId:
        "Merancang penyimpanan awan menggunakan Ubuntu Linux dan VirtualBox serta membuat purwarupa tempat sampah otomatis menggunakan mikrokontroler Arduino Uno dan sensor ultrasonik bersama tim.",

      techStack: [
        "Ubuntu Linux",
        "VirtualBox",
        "Arduino Uno",
        "Ultrasonic Sensor",
        "IoT",
      ],

      roleInProject: "Team Developer",

      status: "COMPLETED",

      sortOrder: 3,
    },
  });

  console.log("✅ Projects created");

  // ============================================================
  // PROJECT ↔ PROFILE
  // ============================================================

  await prisma.profileProject.createMany({
    data: [
      // General
      {
        profileId: generalProfile.id,
        projectId: inventoryProject.id,
        isFeatured: true,
        isIncluded: true,
        sortOrder: 0,
      },
      {
        profileId: generalProfile.id,
        projectId: qrProject.id,
        isFeatured: false,
        isIncluded: true,
        sortOrder: 1,
      },
      {
        profileId: generalProfile.id,
        projectId: mobileProject.id,
        isFeatured: false,
        isIncluded: true,
        sortOrder: 2,
      },
      {
        profileId: generalProfile.id,
        projectId: iotProject.id,
        isFeatured: true,
        isIncluded: true,
        sortOrder: 3,
      },

      // Web
      {
        profileId: webProfile.id,
        projectId: inventoryProject.id,
        isFeatured: true,
        isIncluded: true,
        sortOrder: 0,
      },
      {
        profileId: webProfile.id,
        projectId: qrProject.id,
        isFeatured: true,
        isIncluded: true,
        sortOrder: 1,
      },

      // AI/Data
      {
        profileId: aiProfile.id,
        projectId: inventoryProject.id,
        isFeatured: false,
        isIncluded: true,
        sortOrder: 0,
      },

      // IoT
      {
        profileId: iotProfile.id,
        projectId: iotProject.id,
        isFeatured: true,
        isIncluded: true,
        sortOrder: 0,
      },
      {
        profileId: iotProfile.id,
        projectId: mobileProject.id,
        isFeatured: false,
        isIncluded: true,
        sortOrder: 1,
      },
    ],
    skipDuplicates: true,
  });

  // ============================================================
  // SKILL ↔ PROFILE
  // ============================================================

  for (const skill of skillRecords) {
    const isWeb =
      [
        "HTML",
        "CSS",
        "JavaScript",
        "PHP",
        "MySQL",
        "React.js",
        "Next.js",
        "CodeIgniter",
        "Bootstrap",
        "Flutter",
      ].includes(skill.name);

    const isAI =
      [
        "Python",
        "TensorFlow",
        "CNN",
        "SVM",
      ].includes(skill.name);

    const isIoT =
      [
        "Mikrokontroler",
        "Arduino",
      ].includes(skill.name);

    // General profile
    await prisma.profileSkill.create({
      data: {
        profileId: generalProfile.id,
        skillId: skill.id,
        isHighlighted:
          isWeb || isAI || isIoT,
        isIncluded: true,
        sortOrder: skill.sortOrder,
      },
    });

    if (isWeb) {
      await prisma.profileSkill.create({
        data: {
          profileId: webProfile.id,
          skillId: skill.id,
          isHighlighted: true,
          isIncluded: true,
          sortOrder: skill.sortOrder,
        },
      });
    }

    if (isAI) {
      await prisma.profileSkill.create({
        data: {
          profileId: aiProfile.id,
          skillId: skill.id,
          isHighlighted: true,
          isIncluded: true,
          sortOrder: skill.sortOrder,
        },
      });
    }

    if (isIoT) {
      await prisma.profileSkill.create({
        data: {
          profileId: iotProfile.id,
          skillId: skill.id,
          isHighlighted: true,
          isIncluded: true,
          sortOrder: skill.sortOrder,
        },
      });
    }
  }

  console.log("✅ Profile skills linked");

  console.log("");
  console.log("🎉 Portfolio seed completed successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });