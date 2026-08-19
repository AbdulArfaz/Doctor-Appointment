import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'

import drsiddharth from './drsiddharthagoswami.jpg'
import drjudy from './drjudybordoloi.jpg'
import drmousumi from './drmousumidasgoswami.jpg'
import drpartha from './drpartha.jpg'
import drbiplop from './drbiplop.jpg'
import drdeva from './drdevakumar.jpg'
import draswini from './draswinibezbarua.jpg'
import drmaileng from './drmaileng.jpg'
import drsiddayal from './drsiddayal.jpg'
import drgeetanjali from './drgeetanjalisahariahkhound.jpg'
import drradhika from './drradhikaranjandas.jpg'
import drpurna from './drpurna.jpg'
import drtandra from './drtandrabiswas.jpg'
import drHimleena  from './drHimleena.jpg'
import drarun from './drarunagarwal.jpg'
import banner from './bannerbooking.jpg'
import docslot from './docslot.jpg'
import stetAbout from './stethoscopeABOUT.jpg'
import contactUs from './contactUsPhoto.jpg'


import genphysician from './genphysician.png'
import dermato from './dermato.jpg'
import gastro from './gastro.jpg'
import gynaecology from './gynaecology.jpg'
import neuro from './neuro.jpg'
import pediat from './pediat.jpg'



export const assets = {
    contactUs,
    stetAbout,
    banner,
    docslot,
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: genphysician
    },
    {
        speciality: 'Gynecologist',
        image: gynaecology
    },
    {
        speciality: 'Dermatologist',
        image: dermato
    },
    {
        speciality: 'Pediatricians',
        image: pediat
    },
    {
        speciality: 'Neurologist',
        image: neuro
    },
    {
        speciality: 'Gastroenterologist',
        image: gastro
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Siddhartha Goswami',
        image: drsiddharth,
        speciality: 'General physician',
        degree: 'MD (Internal Medicine), IFCCM, Critical Care Fellowship (CMC, Vellore)',
        experience: '11 + Years',
        about: 'Dr Siddhartha Goswami is a highly experienced general physician and internal medicine specialist with over 11 years of dedicated service in the medical field. Dr Goswami holds an MD in Internal Medicine, an Indian Fellowship in Critical Care Medicine and a Critical Care Fellowship from the renowned Christian Medical College, Vellore, which underscores his extensive educational background',
        fees: 900,
        address: {
            line1: 'Apollo Hospitals GS Road',
            line2: 'Lotus Tower,  GS Road , Kamrup-Metropolitan, Guwahati, 781005'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Judy Bordoloi',
        image: drjudy,
        speciality: 'Gynecologist',
        degree: 'MBBS, MD',
        experience: '15 Years',
        about: 'Dr. Judy Bordoloi is a dedicated and experienced Obstetrician and Gynaecologist based in Guwahati, Assam. With 16 years of experience in her field, she has built a reputation for providing comprehensive healthcare to women throughout all stages of life, from adolescence to menopause and beyond.',
        fees: 1000,
        address: {
            line1: 'Apollo Excelcare, Guwahati',
            line2: 'GS Road, Kamrup-Metropolitan, Guwahati, 781005'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Mousumi Das Goswami',
        image: drmousumi,
        speciality: 'Dermatologist',
        degree: 'MD',
        experience: '20 + Years',
        about: 'Dr. Mousumi Das Goswami is a top Dermatologist at Apollo Hospitals G S Road in Guwahati. Holding MD, Dr. Mousumi Das Goswami specializes in diagnosing and treating a wide range of Dermatology conditions, including acne, Adenomyosis, Allergies, contact dermatitis, Dandruff, and more.',
        fees: 1000,
        address: {
            line1: 'Apollo Hospitals GS Road',
            line2: 'Lotus Tower,  GS Road , Kamrup-Metropolitan, Guwahati, 781005'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Partha Pratim Borah',
        image: drpartha,
        speciality: 'Pediatricians',
        degree: 'DCH (GMCH), Diploma in Pediatric Sleep Medicine , Trained in Pediatric Bronchoscopy ( NUH Singapore)',
        experience: '20 Years',
        about: 'Dr. Partha Pratim Borah is a highly accomplished Consultant Pediatrician, Neonatologist, Intensivist, and Pediatric Pulmonologist with over 17 years of dedicated clinical experience. He is currently leading multiple critical pediatric units, including a 35-bed Level III Neonatal Intensive Care Unit (NICU) and a 6-bed Level III Pediatric Intensive Care Unit (PICU).',
        fees: 800,
        address: {
            line1: ': Pratiksha Rainbow Childrens Hospital - Best Pediatric Hospital in Guwahati',
            line2: 'Room No-22, VIP Rd, Borbari, Guwahati, Assam 781001'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Biplop Das',
        image: drbiplop,
        speciality: 'Neurologist',
        degree: '“Doctor of Medicine”, MD (Internal Medicine) and Doctorate of Medicine, DM (Neurology)',
        experience: '10 Years',
        about: 'Dr Biplab Das has immense and comprehensive experience of in treating all Neurological Disorders including Stroke (Brain attack, Brain clot/bleeding, Paralysis), Migraine or other headaches, Nerve and Muscle problem (Neuropathy & myopathy), Parkinson disease (Shaking Hans Palsy), Epilepsy (Seizure, Mirgi), Mental Health, Carotid (Brain artery) stenting, Meningitis (Brain Infection), Multiple sclerosis and other autoimmune disorders.',
        fees: 1200,
        address: {
            line1: 'Chikitsa Clinic, 2, Assam Trunk Road ,Near V2',
            line2: 'Adabari,Guwahati, Assam,781014'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Deva Kumar Borhogohain',
        image: drdeva,
        speciality: 'Neurologist',
        degree: 'MBBS, M.S, Mch.(AIIMS, New Delhi)',
        experience: '17 Years',
        about: 'Dr Deva Kumar Borgohain is a distinguished Neurosurgery based at Apollo Excelcare Hospital. With an impressive 17 years of experience in the medical field, he has dedicated his career to providing exceptional healthcare services to patients. He holds MBBS, M.S, Mch.(AIIMS, New Delhi), showcasing his extensive training and commitment to medical excellence. He is proficient in multiple languages, ensuring effective communication with a diverse range of patients.',
        fees: 1000,
        address: {
            line1: 'Apollo Excelcare, Guwahati',
            line2: 'Lotus Tower,  GS Road , Kamrup-Metropolitan, Guwahati, 781005'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Aswini Bezbarua',
        image: draswini,
        speciality: 'General physician',
        degree: 'MD, PGDDM (UK)',
        experience: '22 Years',
        about: 'Dr. Aswini Bezbaruah, MD, PGDDM (UK), brings over 22 years of expertise in Internal Medicine, specializing in the treatment of abdominal pain and rare conditions like Abetalipoproteinemia. Known for delivering exceptional care, Dr. Bezbaruah treats conditions such as Acrodermatitis Enteropathica and offers innovative therapies for infections like Actinomycosis. Dr. Bezbaruah is also an expert in managing acute cases, including diarrhea, ensuring personalized care for every patient.',
        fees: 1600,
        address: {
            line1: 'Apollo Excelcare, Guwahati',
            line2: 'NH-37, Kamrup-Metropolitan, Guwahati, 781001'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Maileng Tham',
        image: drmaileng,
        speciality: 'Gynecologist',
        degree: 'DCO',
        experience: '15 + Years',
        about: 'Dr. Maileng Tham is a top Obstetrician and Gynaecologist at Apollo Hospitals G S Road in Guwahati. Holding DGO, Dr. Maileng Tham specializes in diagnosing and treating a wide range of Obstetrics & Gynaecology conditions, including Adenomyosis, Endometriosis, Fertility, Menopause, Morning sickness, and more.',
        fees: 1300,
        address: {
            line1: 'Apollo Hospitals GS Road',
            line2: 'Lotus Tower,  GS Road , Kamrup-Metropolitan, Guwahati, 781005'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Siddharta Dayal Shah',
        image: drsiddayal,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '5 + Years',
        about: 'Dr Sidhartha Dayal Shah is a top Dermatologist at Apollo Excelcare Hospital in Guwahati. Holding MBBS,, Dr Sidhartha Dayal Shah specializes in diagnosing and treating a wide range of Dermatology conditions, including acne, Adenomyosis, Allergies, contact dermatitis, Dandruff, and more',
        fees: 1100,
        address: {
            line1: 'Apollo Excelcare, Guwahati',
            line2: 'NH-37, Kamrup-Metropolitan, Guwahati, 781001'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Geetanjali Sahariah Khound',
        image: drgeetanjali,
        speciality: 'Pediatricians',
        degree: 'MBBS, DCH',
        experience: '19 + Years',
        about: 'Dr. Geetanjali Sahariah Khound is a top Paediatrician at Apollo Hospitals G S Road in Guwahati. Holding MBBS,DCH, Dr. Geetanjali Sahariah Khound specializes in diagnosing and treating a wide range of Paediatrics conditions, including measles, Rotavirus, Pediatric Rehabilitation, Pediatric Physical Therapy, Pediatric Rehabilitation Autism Spectrum Diso, and more.',
        fees: 1400,
        address: {
             line1: 'Apollo Hospitals GS Road',
            line2: 'Lotus Tower,  GS Road , Kamrup-Metropolitan, Guwahati, 781005'

        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Radhika Ranjan Das',
        image: drradhika,
        speciality: 'Neurologist',
        degree: 'MD, DM',
        experience: '27 + Years',
        about: 'Dr. Radhika Ranjan Das is a top Neurologist at Apollo Hospitals G S Road in Guwahati. Holding MD, DM, Dr. Radhika Ranjan Das specializes in diagnosing and treating a wide range of Neurology conditions, including Alexander Disease, Amyotrophic lateral sclerosis, Anencephaly, Ataxia Telangiectasia, Canavan Disease, and more.',
        fees: 1500,
        address: {
             line1: 'Apollo Hospitals GS Road',
            line2: 'Lotus Tower,  GS Road , Kamrup-Metropolitan, Guwahati, 781005'

        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Purnabrat Kashyap',
        image: drpurna,
        speciality: 'Neurologist',
        degree: 'MBBS; MD (General Medicine); DM (Neurology)',
        experience: '10 Years',
        about: 'MBBS: Gauhati Medical College, Guwahati, Gauhati University, Guwahati. Assam - January 2014Postgraduate Degree (MD, medicine): Assam Medical College & Hospital, Dibrugarh, SrimantaSankaradeva University of Health Sciences, Assam - 2020DM(Neurology) - Gauhati Medical college, Guwahati, Sirimanta Sankaradeva University ofHealth Sciences, Assam - May.2024.',
        fees: 1000,
        address: {
            line1: 'Narayana Hospital, Guwahati',
            line2: 'Bafna Complex, Amingoan'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Tandra Biswas',
        image: drtandra,
        speciality: 'General physician',
        degree: 'MD, IDCCM',
        experience: '14 + Years',
        about: 'Dr. Tandra Biswas is a top General Physician/ Internal Medicine Specialist at Apollo Hospitals G S Road in Guwahati. Holding MD, IDCCM, Dr. Tandra Biswas specializes in diagnosing and treating a wide range of General Physician/ Internal Medicine conditions, including Acute Pancreatitis, Antibiotic-associated diarrhea, Brucellosis, Chickenpox, Chikungunya, and more.',
        fees:1000,
        address: {
              line1: 'Apollo Hospitals GS Road',
            line2: 'Lotus Tower,  GS Road , Kamrup-Metropolitan, Guwahati, 781005'

        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Himleena Gautam',
        image: drHimleena,
        speciality: 'Gynecologist',
        degree: 'MBBS,MS,DNB,FAMS',
        experience: '11 Years',
        about: 'Dr. Himleena Gautam is a top Obstetrician and Gynaecologist at Apollo Hospitals G S Road in Guwahati. Holding MBBS,MS,DNB,FAMS, Dr. Himleena Gautam specializes in diagnosing and treating a wide range of Obstetrics & Gynaecology conditions, including Adenomyosis, Endometriosis, Fertility, Menopause, Morning sickness, and more.',
        fees: 1200,
        address: {
                 line1: 'Apollo Hospitals GS Road',
            line2: 'Lotus Tower,  GS Road , Kamrup-Metropolitan, Guwahati, 781005'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Arun Agarwal',
        image: drarun,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD',
        experience: '27 + Years',
        about: 'Dr Arun Agarwal is a top Dermatologist at Apollo Clinic Guwahati, Assam in Guwahati. Holding MBBS, MD, Dr Arun Agarwal specializes in diagnosing and treating a wide range of Dermatology conditions.',
        fees: 1300,
        address: {
            line1:'Apollo Clinic , Siddha Point, SJ Road',
            line2: 'Athgoan , Guwahati , 781001'
        }
    },
]