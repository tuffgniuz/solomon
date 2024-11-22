import { PrismaClient } from "@prisma/client";

import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  // Read the JSON file
  const data = JSON.parse(fs.readFileSync("./asvs.json", "utf-8"));

  for (const topic of data) {
    // Create the SecurityTopic
    const createdTopic = await prisma.securityTopic.create({
      data: {
        security_topic_id: topic.security_topic_id,
        security_topic_name: topic.security_topic_name,
        summary: topic.summary,
      },
    });

    for (const section of topic.security_sections) {
      // Create the SecuritySection
      const createdSection = await prisma.securitySection.create({
        data: {
          security_section_id: section.security_section_id,
          security_section_name: section.security_section_name,
          summary: section.summary,
          security_topic_id: createdTopic.security_topic_id,
        },
      });

      for (const control of section.security_controls) {
        // Create the SecurityControl
        await prisma.securityControl.create({
          data: {
            control_id: control.control_id,
            description: control.description,
            level1: control.level1,
            level2: control.level2,
            level3: control.level3,
            cwe: control.cwe || null,
            nist: control.nist || null,
            link: control.link || null,
            security_section_id: createdSection.security_section_id,
          },
        });
      }
    }
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
