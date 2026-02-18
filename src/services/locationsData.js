// Comprehensive locations data for India - organized by State > District > City/Area
// Used for Location pages, Advertiser Dashboard, Home page search, etc.

export const locationsData = {
  'andaman-and-nicobar': {
    name: 'Andaman and Nicobar',
    type: 'state',
    districts: {
      'andaman-islands': {
        name: 'Andaman Islands',
        cities: []
      },
      'nicobar-islands': {
        name: 'Nicobar Islands',
        cities: []
      }
    }
  },
  'andhra-pradesh': {
    name: 'Andhra Pradesh',
    type: 'state',
    districts: {
      'anantapur': {
        name: 'Anantapur',
        cities: ['Anantapur', 'Dharmavaram', 'Guntakal', 'Hindupur', 'Tadpatri']
      },
      'chittoor': {
        name: 'Chittoor',
        cities: ['Chittoor', 'Madanapalle', 'Tirupati']
      },
      'east-godavari': {
        name: 'East Godavari',
        cities: ['Kakinada', 'Rajahmundry']
      },
      'guntur': {
        name: 'Guntur',
        cities: ['Guntur', 'Narasaraopet', 'Tenali']
      },
      'kadapa': {
        name: 'Kadapa',
        cities: ['Kadapa', 'Proddatur']
      },
      'krishna': {
        name: 'Krishna',
        cities: ['Machilipatnam', 'Vijayawada']
      },
      'kurnool': {
        name: 'Kurnool',
        cities: ['Adoni', 'Kurnool', 'Nandyal']
      },
      'nellore': {
        name: 'Nellore',
        cities: ['Nellore']
      },
      'prakasam': {
        name: 'Prakasam',
        cities: ['Chirala', 'Ongole']
      },
      'srikakulam': {
        name: 'Srikakulam',
        cities: ['Srikakulam']
      },
      'visakhapatnam': {
        name: 'Visakhapatnam',
        cities: ['Anakapalli', 'Visakhapatnam']
      },
      'vizianagaram': {
        name: 'Vizianagaram',
        cities: ['Vizianagaram']
      },
      'west-godavari': {
        name: 'West Godavari',
        cities: ['Bhimavaram', 'Eluru', 'Tadepallegudem']
      }
    }
  },
  'arunachal-pradesh': {
    name: 'Arunachal Pradesh',
    type: 'state',
    districts: {
      'changlang': { name: 'Changlang', cities: [] },
      'lohit': { name: 'Lohit', cities: ['Tezu'] },
      'papum-pare': { name: 'Papum Pare', cities: ['Itanagar'] },
      'tirap': { name: 'Tirap', cities: [] },
      'west-siang': { name: 'West Siang', cities: ['Along'] }
    }
  },
  'assam': {
    name: 'Assam',
    type: 'state',
    districts: {
      'barpeta': { name: 'Barpeta', cities: [] },
      'bongaigaon': { name: 'Bongaigaon', cities: [] },
      'cachar': { name: 'Cachar', cities: ['Silchar'] },
      'dibrugarh': { name: 'Dibrugarh', cities: ['Dibrugarh'] },
      'goalpara': { name: 'Goalpara', cities: [] },
      'golaghat': { name: 'Golaghat', cities: [] },
      'jorhat': { name: 'Jorhat', cities: ['Jorhat'] },
      'kamrup': { name: 'Kamrup', cities: ['Guwahati'] },
      'karimganj': { name: 'Karimganj', cities: [] },
      'lakhimpur-assam': { name: 'Lakhimpur', cities: [] },
      'nagaon': { name: 'Nagaon', cities: [] },
      'sonitpur': { name: 'Sonitpur', cities: ['Tezpur'] },
      'tinsukia': { name: 'Tinsukia', cities: ['Tinsukia'] }
    }
  },
  'bihar': {
    name: 'Bihar',
    type: 'state',
    districts: {
      'araria': { name: 'Araria', cities: [] },
      'aurangabad-bihar': { name: 'Aurangabad', cities: [] },
      'banka': { name: 'Banka', cities: [] },
      'begusarai': { name: 'Begusarai', cities: ['Begusarai'] },
      'bhagalpur': { name: 'Bhagalpur', cities: ['Bhagalpur'] },
      'bhojpur': { name: 'Bhojpur', cities: ['Arrah'] },
      'buxar': { name: 'Buxar', cities: ['Buxar'] },
      'darbhanga': { name: 'Darbhanga', cities: ['Darbhanga'] },
      'east-champaran': { name: 'East Champaran', cities: [] },
      'gaya': { name: 'Gaya', cities: ['Gaya'] },
      'gopalganj': { name: 'Gopalganj', cities: [] },
      'jamui': { name: 'Jamui', cities: [] },
      'jehanabad': { name: 'Jehanabad', cities: [] },
      'katihar': { name: 'Katihar', cities: ['Katihar'] },
      'khagaria': { name: 'Khagaria', cities: [] },
      'kishanganj': { name: 'Kishanganj', cities: [] },
      'madhepura': { name: 'Madhepura', cities: [] },
      'madhubani': { name: 'Madhubani', cities: [] },
      'munger': { name: 'Munger', cities: ['Munger'] },
      'muzaffarpur': { name: 'Muzaffarpur', cities: ['Muzaffarpur'] },
      'nalanda': { name: 'Nalanda', cities: ['Bihar Sharif'] },
      'nawada': { name: 'Nawada', cities: [] },
      'patna': { name: 'Patna', cities: ['Patna'] },
      'purnia': { name: 'Purnia', cities: ['Purnia'] },
      'rohtas': { name: 'Rohtas', cities: ['Sasaram'] },
      'saharsa': { name: 'Saharsa', cities: [] },
      'samastipur': { name: 'Samastipur', cities: [] },
      'saran': { name: 'Saran', cities: ['Chhapra'] },
      'sitamarhi': { name: 'Sitamarhi', cities: [] },
      'siwan': { name: 'Siwan', cities: ['Siwan'] },
      'supaul': { name: 'Supaul', cities: [] },
      'vaishali': { name: 'Vaishali', cities: ['Hajipur'] },
      'west-champaran': { name: 'West Champaran', cities: ['Bettiah'] }
    }
  },
  'chandigarh-state': {
    name: 'Chandigarh',
    type: 'union-territory',
    districts: {
      'chandigarh': { name: 'Chandigarh', cities: ['Chandigarh'] }
    }
  },
  'chhattisgarh': {
    name: 'Chhattisgarh',
    type: 'state',
    districts: {
      'bastar': { name: 'Bastar', cities: ['Jagdalpur'] },
      'bilaspur-cg': { name: 'Bilaspur', cities: ['Bilaspur'] },
      'dhamtari': { name: 'Dhamtari', cities: [] },
      'durg': { name: 'Durg', cities: ['Bhilai', 'Durg'] },
      'janjgir-champa': { name: 'Janjgir-Champa', cities: ['Janjgir'] },
      'korba': { name: 'Korba', cities: ['Korba'] },
      'raigarh-cg': { name: 'Raigarh', cities: ['Raigarh'] },
      'raipur': { name: 'Raipur', cities: ['Raipur'] },
      'rajnandgaon': { name: 'Rajnandgaon', cities: ['Rajnandgaon'] }
    }
  },
  'delhi': {
    name: 'Delhi',
    type: 'union-territory',
    districts: {
      'delhi': {
        name: 'Delhi',
        cities: ['Delhi'],
        areas: ['Aerocity', 'Anand Vihar', 'Dwarka', 'Greater Kailash', 'Green Park', 'Kalkaji', 'Karol Bagh', 'Khanpur', 'Lajpat Nagar', 'Mahipalpur', 'Malviya Nagar', 'Model Town', 'Munirka', 'Nehru Place', 'Paharganj', 'Paschim Vihar', 'Pitampura', 'Preet Vihar', 'Rohini', 'Safdarjung', 'Saket', 'Shahdara', 'Shakti Nagar', 'Shastri Nagar', 'Vasant Kunj', 'Vasant Vihar', 'Yamuna Vihar']
      },
      'new-delhi': {
        name: 'New Delhi',
        cities: ['New Delhi'],
        areas: ['Chanakyapuri', 'Connaught Place']
      }
    }
  },
  'goa': {
    name: 'Goa',
    type: 'state',
    districts: {
      'north-goa': { name: 'North Goa', cities: ['Panaji'] },
      'south-goa': { name: 'South Goa', cities: ['Vasco Da Gama'] }
    }
  },
  'gujarat': {
    name: 'Gujarat',
    type: 'state',
    districts: {
      'ahmedabad': {
        name: 'Ahmedabad',
        cities: ['Ahmedabad'],
        areas: ['Ambawadi', 'Ashram Road', 'CG Road', 'Chandkheda', 'Maninagar', 'Naroda', 'Narol', 'Navrangpura', 'Nehru Nagar', 'Odhav', 'Paldi', 'Vastral', 'Vastrapur']
      },
      'amreli': { name: 'Amreli', cities: ['Amreli'] },
      'anand': { name: 'Anand', cities: ['Anand'] },
      'banas-kantha': { name: 'Banas Kantha', cities: ['Palanpur'] },
      'bharuch': { name: 'Bharuch', cities: ['Bharuch'] },
      'bhavnagar': { name: 'Bhavnagar', cities: ['Bhavnagar'] },
      'botad': { name: 'Botad', cities: ['Botad'] },
      'dahod': { name: 'Dahod', cities: ['Dahod'] },
      'gandhinagar': { name: 'Gandhinagar', cities: ['Gandhinagar', 'Kalol'] },
      'gir-somnath': { name: 'Gir Somnath', cities: ['Veraval'] },
      'jamnagar': { name: 'Jamnagar', cities: ['Jamnagar'] },
      'junagadh': { name: 'Junagadh', cities: ['Junagadh', 'Veraval'] },
      'kheda': { name: 'Kheda', cities: ['Nadiad'] },
      'kutch': { name: 'Kutch', cities: ['Bhuj'] },
      'mehsana': { name: 'Mehsana', cities: ['Mehsana'] },
      'morbi': { name: 'Morbi', cities: ['Morbi'] },
      'navsari': { name: 'Navsari', cities: ['Navsari'] },
      'panchmahal': { name: 'PanchMahal', cities: ['Godhra'] },
      'patan': { name: 'Patan', cities: ['Patan'] },
      'porbandar': { name: 'Porbandar', cities: ['Porbandar'] },
      'rajkot': { name: 'Rajkot', cities: ['Gondal', 'Rajkot'] },
      'sabarkantha': { name: 'Sabarkantha', cities: ['Himatnagar'] },
      'surat': { name: 'Surat', cities: ['Surat'] },
      'surendranagar': { name: 'Surendranagar', cities: ['Surendranagar'] },
      'vadodara': { name: 'Vadodara', cities: ['Vadodara'] },
      'valsad': { name: 'Valsad', cities: ['Valsad', 'Vapi'] }
    }
  },
  'haryana': {
    name: 'Haryana',
    type: 'state',
    districts: {
      'ambala': { name: 'Ambala', cities: ['Ambala'] },
      'bhiwani': { name: 'Bhiwani', cities: ['Bhiwani'] },
      'faridabad': { name: 'Faridabad', cities: ['Faridabad'] },
      'fatehabad': { name: 'Fatehabad', cities: ['Fatehabad'] },
      'gurgaon': { name: 'Gurgaon', cities: ['Gurgaon'] },
      'hisar': { name: 'Hisar', cities: ['Hisar'] },
      'jhajjar': { name: 'Jhajjar', cities: ['Jhajjar'] },
      'jind': { name: 'Jind', cities: ['Jind'] },
      'kaithal': { name: 'Kaithal', cities: ['Kaithal'] },
      'karnal': { name: 'Karnal', cities: ['Karnal'] },
      'kurukshetra': { name: 'Kurukshetra', cities: ['Thanesar'] },
      'mahendragarh': { name: 'Mahendragarh', cities: ['Mahendragarh'] },
      'palwal': { name: 'Palwal', cities: ['Palwal'] },
      'panchkula': { name: 'Panchkula', cities: ['Panchkula'] },
      'panipat': { name: 'Panipat', cities: ['Panipat'] },
      'rewari': { name: 'Rewari', cities: ['Rewari'] },
      'rohtak': { name: 'Rohtak', cities: ['Rohtak'] },
      'sirsa': { name: 'Sirsa', cities: ['Sirsa'] },
      'sonipat': { name: 'Sonipat', cities: ['Sonipat'] },
      'yamunanagar': { name: 'Yamunanagar', cities: ['Yamunanagar'] }
    }
  },
  'himachal-pradesh': {
    name: 'Himachal Pradesh',
    type: 'state',
    districts: {
      'kangra': { name: 'Kangra', cities: ['Kangra'] },
      'shimla': { name: 'Shimla', cities: ['Shimla'] }
    }
  },
  'jammu-and-kashmir': {
    name: 'Jammu and Kashmir',
    type: 'union-territory',
    districts: {
      'anantnag': { name: 'Anantnag', cities: ['Anantnag'] },
      'jammu': { name: 'Jammu', cities: ['Jammu'] },
      'srinagar': { name: 'Srinagar', cities: ['Srinagar'] }
    }
  },
  'jharkhand': {
    name: 'Jharkhand',
    type: 'state',
    districts: {
      'bokaro': { name: 'Bokaro', cities: ['Bokaro', 'Phusro'] },
      'deoghar': { name: 'Deoghar', cities: ['Deoghar'] },
      'dhanbad': { name: 'Dhanbad', cities: ['Chirkunda', 'Dhanbad'] },
      'east-singhbhum': { name: 'East Singhbhum', cities: ['Jamshedpur'] },
      'giridih': { name: 'Giridih', cities: ['Giridih'] },
      'hazaribag': { name: 'Hazaribag', cities: ['Hazaribag'] },
      'palamu': { name: 'Palamu', cities: ['Medininagar'] },
      'ramgarh': { name: 'Ramgarh', cities: ['Ramgarh'] },
      'ranchi': { name: 'Ranchi', cities: ['Ranchi'] },
      'west-singhbhum': { name: 'West Singhbhum', cities: ['Chakradharpur'] }
    }
  },
  'karnataka': {
    name: 'Karnataka',
    type: 'state',
    districts: {
      'bagalkot': { name: 'Bagalkot', cities: ['Bagalkot'] },
      'bangalore': {
        name: 'Bangalore',
        cities: ['Bangalore'],
        areas: ['Banaswadi', 'Bellandur', 'Bommanahalli', 'BTM Layout', 'Byatarayanapura', 'Dasarahalli', 'Doddaballapur', 'Domlur', 'Electronic City', 'Hebbal', 'Indiranagar', 'Jigani', 'Kammanahalli', 'Koramangala', 'Madiwala', 'Mahadevapura', 'Marathahalli', 'Ramamurthy Nagar', 'Whitefield', 'Yeshwanthpur']
      },
      'belgaum': { name: 'Belgaum', cities: ['Belgaum', 'Gokak'] },
      'bellary': { name: 'Bellary', cities: ['Bellary'] },
      'bidar': { name: 'Bidar', cities: ['Bidar'] },
      'bijapur': { name: 'Bijapur', cities: ['Bijapur'] },
      'chikballapur': { name: 'Chikballapur', cities: ['Chikballapur'] },
      'chikmagalur': { name: 'Chikmagalur', cities: ['Chikmagalur'] },
      'chitradurga': { name: 'Chitradurga', cities: ['Chitradurga'] },
      'dakshina-kannada': { name: 'Dakshina Kannada', cities: ['Mangalore'] },
      'davanagere': { name: 'Davanagere', cities: ['Davanagere'] },
      'dharwad': { name: 'Dharwad', cities: ['Hubli-Dharwad'] },
      'gadag': { name: 'Gadag', cities: ['Gadag'] },
      'gulbarga': { name: 'Gulbarga', cities: ['Gulbarga'] },
      'hassan': { name: 'Hassan', cities: ['Hassan'] },
      'haveri': { name: 'Haveri', cities: ['Haveri', 'Ranebennuru'] },
      'kolar': { name: 'Kolar', cities: ['Kolar', 'Robertsonpet'] },
      'koppal': { name: 'Koppal', cities: ['Gangavati', 'Koppal'] },
      'mandya': { name: 'Mandya', cities: ['Mandya'] },
      'mysore': { name: 'Mysore', cities: ['Mysore'] },
      'raichur': { name: 'Raichur', cities: ['Raichur'] },
      'shimoga': { name: 'Shimoga', cities: ['Bhadravati', 'Shimoga'] },
      'tumkur': { name: 'Tumkur', cities: ['Tumkur'] },
      'udupi': { name: 'Udupi', cities: ['Udupi'] },
      'uttara-kannada': { name: 'Uttara Kannada', cities: ['Karwar'] },
      'yadgir': { name: 'Yadgir', cities: ['Yadgir'] }
    }
  },
  'kerala': {
    name: 'Kerala',
    type: 'state',
    districts: {
      'alappuzha': { name: 'Alappuzha', cities: ['Alappuzha'] },
      'ernakulam': { name: 'Ernakulam', cities: ['Kochi', 'Thrippunithura'] },
      'kannur': { name: 'Kannur', cities: ['Kannur'] },
      'kasaragod': { name: 'Kasaragod', cities: ['Kasaragod'] },
      'kottayam': { name: 'Kottayam', cities: ['Kottayam'] },
      'kozhikode': { name: 'Kozhikode', cities: ['Kozhikode'] },
      'malappuram': { name: 'Malappuram', cities: ['Manjeri'] },
      'palakkad': { name: 'Palakkad', cities: ['Palakkad'] },
      'thiruvananthapuram': { name: 'Thiruvananthapuram', cities: ['Thiruvananthapuram'] },
      'thrissur': { name: 'Thrissur', cities: ['Thrissur'] }
    }
  },
  'madhya-pradesh': {
    name: 'Madhya Pradesh',
    type: 'state',
    districts: {
      'ashoknagar': { name: 'Ashoknagar', cities: ['Ashoknagar'] },
      'balaghat': { name: 'Balaghat', cities: ['Balaghat'] },
      'betul': { name: 'Betul', cities: ['Betul'] },
      'bhind': { name: 'Bhind', cities: ['Bhind'] },
      'bhopal': { name: 'Bhopal', cities: ['Bhopal'] },
      'burhanpur': { name: 'Burhanpur', cities: ['Burhanpur'] },
      'chhatarpur': { name: 'Chhatarpur', cities: ['Chhatarpur'] },
      'chhindwara': { name: 'Chhindwara', cities: ['Chhindwara'] },
      'damoh': { name: 'Damoh', cities: ['Damoh'] },
      'datia': { name: 'Datia', cities: ['Datia'] },
      'dewas': { name: 'Dewas', cities: ['Dewas'] },
      'dhar': { name: 'Dhar', cities: ['Pithampur'] },
      'guna': { name: 'Guna', cities: ['Guna'] },
      'gwalior': { name: 'Gwalior', cities: ['Gwalior'] },
      'hoshangabad': { name: 'Hoshangabad', cities: ['Hoshangabad', 'Itarsi'] },
      'indore': { name: 'Indore', cities: ['Indore'] },
      'jabalpur': { name: 'Jabalpur', cities: ['Jabalpur'] },
      'katni': { name: 'Katni', cities: ['Katni'] },
      'khandwa': { name: 'Khandwa', cities: ['Khandwa'] },
      'khargone': { name: 'Khargone', cities: ['Khargone'] },
      'mandla': { name: 'Mandla', cities: ['Mandla'] },
      'mandsaur': { name: 'Mandsaur', cities: ['Mandsaur'] },
      'morena': { name: 'Morena', cities: ['Morena'] },
      'narsinghpur': { name: 'Narsinghpur', cities: ['Narsinghpur'] },
      'neemuch': { name: 'Neemuch', cities: ['Neemuch'] },
      'ratlam': { name: 'Ratlam', cities: ['Ratlam'] },
      'rewa': { name: 'Rewa', cities: ['Rewa'] },
      'sagar': { name: 'Sagar', cities: ['Sagar'] },
      'satna': { name: 'Satna', cities: ['Satna'] },
      'sehore': { name: 'Sehore', cities: ['Sehore'] },
      'seoni': { name: 'Seoni', cities: ['Seoni'] },
      'shivpuri': { name: 'Shivpuri', cities: ['Shivpuri'] },
      'singrauli': { name: 'Singrauli', cities: ['Singrauli'] },
      'tikamgarh': { name: 'Tikamgarh', cities: ['Tikamgarh'] },
      'ujjain': { name: 'Ujjain', cities: ['Nagda', 'Ujjain'] },
      'vidisha': { name: 'Vidisha', cities: ['Vidisha'] }
    }
  },
  'maharashtra': {
    name: 'Maharashtra',
    type: 'state',
    districts: {
      'ahmednagar': { name: 'Ahmednagar', cities: ['Ahmednagar'] },
      'akola': { name: 'Akola', cities: ['Akola'] },
      'amravati': { name: 'Amravati', cities: ['Achalpur', 'Amravati'] },
      'aurangabad-maharashtra': { name: 'Aurangabad', cities: ['Aurangabad'] },
      'beed': { name: 'Beed', cities: ['Beed'] },
      'chandrapur': { name: 'Chandrapur', cities: ['Chandrapur'] },
      'dhule': { name: 'Dhule', cities: ['Dhule'] },
      'gondia': { name: 'Gondia', cities: ['Gondia'] },
      'jalgaon': { name: 'Jalgaon', cities: ['Bhusawal', 'Jalgaon'] },
      'jalna': { name: 'Jalna', cities: ['Jalna'] },
      'kolhapur': { name: 'Kolhapur', cities: ['Ichalkaranji', 'Kolhapur'] },
      'latur': { name: 'Latur', cities: ['Latur', 'Udgir'] },
      'mumbai': {
        name: 'Mumbai',
        cities: ['Mumbai'],
        areas: ['Andheri', 'Bandra', 'Bhandup', 'Borivali', 'Chembur', 'Churchgate', 'Colaba', 'Cuffe Parade', 'Dadar', 'Goregaon', 'Juhu', 'Kandivali', 'Kurla', 'Lower Parel', 'Mahim', 'Malad', 'Malabar Hill', 'Marine Drive', 'Mumbai Central', 'Nariman Point', 'Powai', 'Santacruz', 'Worli']
      },
      'nagpur': { name: 'Nagpur', cities: ['Nagpur'] },
      'nanded': { name: 'Nanded', cities: ['Nanded Waghala'] },
      'nandurbar': { name: 'Nandurbar', cities: ['Nandurbar'] },
      'nashik': { name: 'Nashik', cities: ['Malegaon', 'Nashik'] },
      'osmanabad': { name: 'Osmanabad', cities: ['Osmanabad'] },
      'palghar': { name: 'Palghar', cities: ['Vasai-Virar'] },
      'parbhani': { name: 'Parbhani', cities: ['Parbhani'] },
      'pune': { name: 'Pune', cities: ['Pimpri-Chinchwad', 'Pune'] },
      'raigad': { name: 'Raigad', cities: ['Panvel'] },
      'ratnagiri': { name: 'Ratnagiri', cities: ['Ratnagiri'] },
      'sangli': { name: 'Sangli', cities: ['Sangli-Miraj & Kupwad'] },
      'satara': { name: 'Satara', cities: ['Satara'] },
      'solapur': { name: 'Solapur', cities: ['Barshi', 'Solapur'] },
      'thane': { name: 'Thane', cities: ['Ambarnath', 'Bhiwandi', 'Kalyan-Dombivli', 'Navi Mumbai', 'Thane', 'Ulhasnagar'] },
      'wardha': { name: 'Wardha', cities: ['Hinganghat'] },
      'yavatmal': { name: 'Yavatmal', cities: ['Yavatmal'] }
    }
  },
  'manipur': {
    name: 'Manipur',
    type: 'state',
    districts: {
      'west-imphal': { name: 'West Imphal', cities: ['Imphal'] }
    }
  },
  'meghalaya': {
    name: 'Meghalaya',
    type: 'state',
    districts: {
      'east-khasi-hills': { name: 'East Khasi Hills', cities: ['Shillong'] },
      'west-garo-hills': { name: 'West Garo Hills', cities: ['Tura'] }
    }
  },
  'mizoram': {
    name: 'Mizoram',
    type: 'state',
    districts: {
      'aizawl': { name: 'Aizawl', cities: ['Aizawl'] }
    }
  },
  'nagaland': {
    name: 'Nagaland',
    type: 'state',
    districts: {
      'dimapur': { name: 'Dimapur', cities: ['Dimapur'] },
      'kohima': { name: 'Kohima', cities: ['Kohima'] }
    }
  },
  'odisha': {
    name: 'Odisha',
    type: 'state',
    districts: {
      'balangir': { name: 'Balangir', cities: ['Balangir'] },
      'balasore': { name: 'Balasore', cities: ['Balasore'] },
      'bargarh': { name: 'Bargarh', cities: ['Bargarh'] },
      'bhadrak': { name: 'Bhadrak', cities: ['Bhadrak'] },
      'cuttack': { name: 'Cuttack', cities: ['Cuttack'] },
      'jharsuguda': { name: 'Jharsuguda', cities: ['Jharsuguda'] },
      'kalahandi': { name: 'Kalahandi', cities: ['Bhawanipatna'] },
      'khordha': { name: 'Khordha', cities: ['Bhubaneswar'] },
      'mayurbhanj': { name: 'Mayurbhanj', cities: ['Baripada'] },
      'puri': { name: 'Puri', cities: ['Puri'] },
      'sambalpur': { name: 'Sambalpur', cities: ['Sambalpur'] },
      'sundargarh': { name: 'Sundargarh', cities: ['Rourkela'] }
    }
  },
  'puducherry': {
    name: 'Puducherry',
    type: 'union-territory',
    districts: {
      'puducherry': { name: 'Puducherry', cities: ['Puducherry'] }
    }
  },
  'punjab': {
    name: 'Punjab',
    type: 'state',
    districts: {
      'amritsar': { name: 'Amritsar', cities: ['Amritsar'] },
      'barnala': { name: 'Barnala', cities: ['Barnala'] },
      'bathinda': { name: 'Bathinda', cities: ['Bathinda'] },
      'faridkot': { name: 'Faridkot', cities: ['Faridkot'] },
      'fazilka': { name: 'Fazilka', cities: ['Abohar'] },
      'firozpur': { name: 'Firozpur', cities: ['Firozpur'] },
      'gurdaspur': { name: 'Gurdaspur', cities: ['Batala'] },
      'jalandhar': { name: 'Jalandhar', cities: ['Jalandhar'] },
      'kapurthala': { name: 'Kapurthala', cities: ['Kapurthala', 'Phagwara'] },
      'ludhiana': { name: 'Ludhiana', cities: ['Khanna', 'Ludhiana'] },
      'moga': { name: 'Moga', cities: ['Moga'] },
      'mohali': { name: 'Mohali', cities: ['Mohali'] },
      'muktsar': { name: 'Muktsar', cities: ['Muktsar'] },
      'pathankot': { name: 'Pathankot', cities: ['Pathankot'] },
      'patiala': { name: 'Patiala', cities: ['Patiala', 'Rajpura'] },
      'sangrur': { name: 'Sangrur', cities: ['Malerkotla', 'Sangrur'] }
    }
  },
  'rajasthan': {
    name: 'Rajasthan',
    type: 'state',
    districts: {
      'ajmer': { name: 'Ajmer', cities: ['Ajmer', 'Beawar', 'Kishangarh'] },
      'alwar': { name: 'Alwar', cities: ['Alwar', 'Bhiwadi'] },
      'banswara': { name: 'Banswara', cities: ['Banswara'] },
      'baran': { name: 'Baran', cities: ['Baran'] },
      'barmer': { name: 'Barmer', cities: ['Barmer'] },
      'bharatpur': { name: 'Bharatpur', cities: ['Bharatpur'] },
      'bhilwara': { name: 'Bhilwara', cities: ['Bhilwara'] },
      'bikaner': { name: 'Bikaner', cities: ['Bikaner'] },
      'bundi': { name: 'Bundi', cities: ['Bundi'] },
      'chittaurgarh': { name: 'Chittaurgarh', cities: ['Chittaurgarh'] },
      'churu': { name: 'Churu', cities: ['Churu', 'Sujangarh'] },
      'dhaulpur': { name: 'Dhaulpur', cities: ['Dhaulpur'] },
      'ganganagar': { name: 'Ganganagar', cities: ['Ganganagar'] },
      'hanumangarh': { name: 'Hanumangarh', cities: ['Hanumangarh'] },
      'jaipur': { name: 'Jaipur', cities: ['Jaipur'] },
      'jhunjhunu': { name: 'Jhunjhunu', cities: ['Jhunjhunu'] },
      'jodhpur': { name: 'Jodhpur', cities: ['Jodhpur'] },
      'karauli': { name: 'Karauli', cities: ['Hindaun'] },
      'kota': { name: 'Kota', cities: ['Kota'] },
      'nagaur': { name: 'Nagaur', cities: ['Makrana'] },
      'pali': { name: 'Pali', cities: ['Pali'] },
      'sawai-madhopur': { name: 'Sawai Madhopur', cities: ['Gangapur', 'Sawai Madhopur'] },
      'sikar': { name: 'Sikar', cities: ['Fatehpur', 'Sikar'] },
      'tonk': { name: 'Tonk', cities: ['Tonk'] },
      'udaipur': { name: 'Udaipur', cities: ['Udaipur'] }
    }
  },
  'sikkim': {
    name: 'Sikkim',
    type: 'state',
    districts: {
      'east-sikkim': { name: 'East Sikkim', cities: ['Gangtok'] }
    }
  },
  'tamil-nadu': {
    name: 'Tamil Nadu',
    type: 'state',
    districts: {
      'chengalpattu': { name: 'Chengalpattu', cities: ['Chengalpattu'] },
      'chennai': {
        name: 'Chennai',
        cities: ['Chennai'],
        areas: ['Alandur', 'Ambattur', 'Anna Nagar', 'Egmore', 'Guindy', 'Koyambedu', 'Mylapore', 'Nungambakkam', 'Poonamallee', 'Porur', 'Sholinganallur', 'Tambaram', 'T Nagar', 'Vadapalani', 'Velachery']
      },
      'coimbatore': {
        name: 'Coimbatore',
        cities: ['Coimbatore'],
        areas: ['Avanashi', 'Goundampalayam', 'Kuniyamuthur', 'Kurichi', 'Mettupalayam', 'Pollachi', 'Udumalaipettai', 'Valparai']
      },
      'cuddalore': { name: 'Cuddalore', cities: ['Cuddalore'] },
      'dharmapuri': { name: 'Dharmapuri', cities: ['Dharmapuri'] },
      'dindigul': { name: 'Dindigul', cities: ['Dindigul'] },
      'erode': { name: 'Erode', cities: ['Erode'] },
      'kanchipuram': { name: 'Kanchipuram', cities: ['Kanchipuram'] },
      'kanyakumari': { name: 'Kanyakumari', cities: ['Nagercoil'] },
      'karur': { name: 'Karur', cities: ['Karur'] },
      'krishnagiri': { name: 'Krishnagiri', cities: ['Hosur'] },
      'madurai': { name: 'Madurai', cities: ['Madurai'] },
      'nagapattinam': { name: 'Nagapattinam', cities: ['Nagapattinam'] },
      'namakkal': { name: 'Namakkal', cities: ['Kumarapalayam'] },
      'pudukkottai': { name: 'Pudukkottai', cities: ['Pudukkottai'] },
      'ranipet': { name: 'Ranipet', cities: ['Ranipet'] },
      'salem': { name: 'Salem', cities: ['Salem'] },
      'sivaganga': { name: 'Sivaganga', cities: ['Karaikkudi'] },
      'thanjavur': { name: 'Thanjavur', cities: ['Kumbakonam', 'Thanjavur'] },
      'the-nilgiris': { name: 'The Nilgiris', cities: ['Udhagamandalam'] },
      'thoothukudi': { name: 'Thoothukudi', cities: ['Thoothukudi'] },
      'tiruchirappalli': { name: 'Tiruchirappalli', cities: ['Tiruchirappalli'] },
      'tirunelveli': { name: 'Tirunelveli', cities: ['Tirunelveli'] },
      'tirupathur': { name: 'Tirupathur', cities: ['Ambur', 'Vaniyambadi'] },
      'tiruppur': { name: 'Tiruppur', cities: ['Tiruppur'] },
      'tiruvannamalai': { name: 'Tiruvannamalai', cities: ['Tiruvannamalai'] },
      'vellore': { name: 'Vellore', cities: ['Gudiyattam', 'Vellore'] },
      'virudhunagar': { name: 'Virudhunagar', cities: ['Rajapalaiyam', 'Sivakasi'] }
    }
  },
  'telangana': {
    name: 'Telangana',
    type: 'state',
    districts: {
      'adilabad': { name: 'Adilabad', cities: ['Adilabad'] },
      'hyderabad': {
        name: 'Hyderabad',
        cities: ['Hyderabad'],
        areas: ['Abids', 'Ameerpet', 'Balanagar', 'Banjara Hills', 'Begumpet', 'Gachibowli', 'HITEC City', 'Jubilee Hills', 'Khairatabad', 'Kondapur', 'Kukatpally', 'Madhapur', 'Mehdipatnam', 'Miyapur', 'Musheerabad', 'Old City', 'Sanath Nagar', 'Secunderabad', 'Somajiguda', 'SR Nagar']
      },
      'jagtial': { name: 'Jagtial', cities: ['Jagtial'] },
      'karimnagar': { name: 'Karimnagar', cities: ['Karimnagar'] },
      'khammam': { name: 'Khammam', cities: ['Khammam'] },
      'nalgonda': { name: 'Nalgonda', cities: ['Miryalaguda', 'Nalgonda'] },
      'nizamabad': { name: 'Nizamabad', cities: ['Nizamabad'] },
      'peddapalli': { name: 'Peddapalli', cities: ['Peddapalli'] },
      'siddipet': { name: 'Siddipet', cities: ['Siddipet'] },
      'suryapet': { name: 'Suryapet', cities: ['Suryapet'] },
      'warangal': { name: 'Warangal', cities: ['Warangal'] }
    }
  },
  'tripura': {
    name: 'Tripura',
    type: 'state',
    districts: {
      'west-tripura': { name: 'West Tripura', cities: ['Agartala'] }
    }
  },
  'uttarakhand': {
    name: 'Uttarakhand',
    type: 'state',
    districts: {
      'dehradun': { name: 'Dehradun', cities: ['Dehradun', 'Rishikesh'] },
      'haridwar': { name: 'Haridwar', cities: ['Haridwar', 'Roorkee'] },
      'nainital': { name: 'Nainital', cities: ['Haldwani', 'Nainital'] },
      'udham-singh-nagar': { name: 'Udham Singh Nagar', cities: ['Kashipur', 'Rudrapur'] }
    }
  },
  'uttar-pradesh': {
    name: 'Uttar Pradesh',
    type: 'state',
    districts: {
      'agra': { name: 'Agra', cities: ['Agra'] },
      'aligarh': { name: 'Aligarh', cities: ['Aligarh'] },
      'allahabad': { name: 'Allahabad', cities: ['Allahabad'] },
      'ambedkar-nagar': { name: 'Ambedkar Nagar', cities: ['Akbarpur', 'Tanda'] },
      'amroha': { name: 'Amroha', cities: ['Amroha'] },
      'auraiya': { name: 'Auraiya', cities: ['Auraiya'] },
      'ayodhya': { name: 'Ayodhya', cities: ['Ayodhya'] },
      'azamgarh': { name: 'Azamgarh', cities: ['Azamgarh'] },
      'baghpat': { name: 'Baghpat', cities: ['Baraut'] },
      'bahraich': { name: 'Bahraich', cities: ['Bahraich'] },
      'ballia': { name: 'Ballia', cities: ['Ballia'] },
      'banda': { name: 'Banda', cities: ['Banda'] },
      'barabanki': { name: 'Barabanki', cities: ['Barabanki'] },
      'bareilly': { name: 'Bareilly', cities: ['Bareilly'] },
      'basti': { name: 'Basti', cities: ['Basti'] },
      'bijnor': { name: 'Bijnor', cities: ['Bijnor'] },
      'budaun': { name: 'Budaun', cities: ['Sahaswan', 'Ujhani'] },
      'bulandshahr': { name: 'Bulandshahr', cities: ['Bulandshahr', 'Khurja'] },
      'chandauli': { name: 'Chandauli', cities: ['Mughalsarai'] },
      'deoria': { name: 'Deoria', cities: ['Deoria'] },
      'etah': { name: 'Etah', cities: ['Awagarh', 'Etah'] },
      'etawah': { name: 'Etawah', cities: ['Etawah'] },
      'farrukhabad': { name: 'Farrukhabad', cities: ['Fatehgarh'] },
      'fatehpur-up': { name: 'Fatehpur', cities: ['Fatehpur'] },
      'firozabad': { name: 'Firozabad', cities: ['Firozabad', 'Shikohabad'] },
      'gautam-buddha-nagar': { name: 'Gautam Buddha Nagar', cities: ['Noida'] },
      'ghaziabad': { name: 'Ghaziabad', cities: ['Ghaziabad', 'Modinagar'] },
      'ghazipur': { name: 'Ghazipur', cities: ['Ghazipur'] },
      'gonda': { name: 'Gonda', cities: ['Gonda'] },
      'gorakhpur': { name: 'Gorakhpur', cities: ['Gorakhpur'] },
      'hapur': { name: 'Hapur', cities: ['Hapur'] },
      'hardoi': { name: 'Hardoi', cities: ['Hardoi'] },
      'hathras': { name: 'Hathras', cities: ['Hathras'] },
      'jalaun': { name: 'Jalaun', cities: ['Orai'] },
      'jaunpur': { name: 'Jaunpur', cities: ['Jaunpur'] },
      'jhansi': { name: 'Jhansi', cities: ['Jhansi'] },
      'kanpur': { name: 'Kanpur', cities: ['Kanpur'] },
      'kasganj': { name: 'Kasganj', cities: ['Kasganj'] },
      'lakhimpur-kheri': { name: 'Lakhimpur Kheri', cities: ['Lakhimpur'] },
      'lalitpur': { name: 'Lalitpur', cities: ['Lalitpur'] },
      'lucknow': { name: 'Lucknow', cities: ['Lucknow'] },
      'mainpuri': { name: 'Mainpuri', cities: ['Mainpuri'] },
      'mathura': { name: 'Mathura', cities: ['Mathura'] },
      'mau': { name: 'Mau', cities: ['Mau'] },
      'meerut': { name: 'Meerut', cities: ['Meerut'] },
      'mirzapur': { name: 'Mirzapur', cities: ['Mirzapur'] },
      'moradabad': { name: 'Moradabad', cities: ['Moradabad'] },
      'muzaffarnagar': { name: 'Muzaffarnagar', cities: ['Muzaffarnagar'] },
      'pilibhit': { name: 'Pilibhit', cities: ['Pilibhit'] },
      'raebareli': { name: 'Raebareli', cities: ['Raebareli'] },
      'rampur': { name: 'Rampur', cities: ['Rampur'] },
      'saharanpur': { name: 'Saharanpur', cities: ['Saharanpur'] },
      'sambhal': { name: 'Sambhal', cities: ['Chandausi'] },
      'shahjahanpur': { name: 'Shahjahanpur', cities: ['Shahjahanpur'] },
      'shamli': { name: 'Shamli', cities: ['Shamli'] },
      'sitapur': { name: 'Sitapur', cities: ['Sitapur'] },
      'sultanpur': { name: 'Sultanpur', cities: ['Sultanpur'] },
      'unnao': { name: 'Unnao', cities: ['Unnao'] },
      'varanasi': { name: 'Varanasi', cities: ['Varanasi'] }
    }
  },
  'west-bengal': {
    name: 'West Bengal',
    type: 'state',
    districts: {
      'alipurduar': { name: 'Alipurduar', cities: ['Alipurduar'] },
      'bankura': { name: 'Bankura', cities: ['Bankura'] },
      'cooch-behar': { name: 'Cooch Behar', cities: ['Cooch Behar'] },
      'dakshin-dinajpur': { name: 'Dakshin Dinajpur', cities: ['Balurghat'] },
      'darjeeling': { name: 'Darjeeling', cities: ['Darjeeling', 'Siliguri'] },
      'hooghly': { name: 'Hooghly', cities: ['Dankuni'] },
      'howrah': { name: 'Howrah', cities: ['Howrah', 'Uluberiya'] },
      'jalpaiguri': { name: 'Jalpaiguri', cities: ['Jalpaiguri'] },
      'jhargram': { name: 'Jhargram', cities: ['Jhargram'] },
      'kolkata': { name: 'Kolkata', cities: ['Kolkata'] },
      'malda': { name: 'Malda', cities: ['Malda'] },
      'murshidabad': { name: 'Murshidabad', cities: ['Baharampur', 'Dhulian', 'Jangipur', 'Murshidabad'] },
      'nadia': { name: 'Nadia', cities: ['Chakdaha', 'Krishnanagar', 'Nabadwip', 'Ranaghat', 'Shantipur'] },
      'north-24-parganas': { name: 'North 24 Parganas', cities: ['Bangaon', 'Basirhat', 'Gaighata', 'Kamarhati'] },
      'paschim-bardhaman': { name: 'Paschim Bardhaman', cities: ['Asansol', 'Durgapur'] },
      'purba-bardhaman': { name: 'Purba Bardhaman', cities: ['Bardhaman'] },
      'purba-medinipur': { name: 'Purba Medinipur', cities: ['Haldia', 'Kalna'] },
      'uttar-dinajpur': { name: 'Uttar Dinajpur', cities: ['Raiganj'] }
    }
  }
}

// Get flat list of all cities for search/filter
export const getAllCities = () => {
  const cities = []
  Object.values(locationsData).forEach(state => {
    Object.values(state.districts).forEach(district => {
      district.cities.forEach(city => {
        if (!cities.includes(city)) {
          cities.push(city)
        }
      })
      // Include areas as searchable locations
      if (district.areas) {
        district.areas.forEach(area => {
          if (!cities.includes(area)) {
            cities.push(area)
          }
        })
      }
    })
  })
  return cities.sort()
}

// Get flat list for AdvertiserDashboard dropdown (cities + areas)
export const getAllLocationsForAdvertiser = () => {
  const locations = []
  Object.values(locationsData).forEach(state => {
    Object.values(state.districts).forEach(district => {
      district.cities.forEach(city => {
        if (!locations.includes(city)) {
          locations.push(city)
        }
      })
      if (district.areas) {
        district.areas.forEach(area => {
          const areaWithCity = district.cities[0] ? `${area}, ${district.cities[0]}` : area
          if (!locations.includes(areaWithCity)) {
            locations.push(areaWithCity)
          }
        })
      }
    })
  })
  return locations.sort()
}

// Get city data for Location page
export const getCityInfo = (citySlug) => {
  const slug = citySlug.toLowerCase().replace(/\s+/g, '-')
  
  // Search through all locations
  for (const [stateSlug, state] of Object.entries(locationsData)) {
    for (const [districtSlug, district] of Object.entries(state.districts)) {
      for (const city of district.cities) {
        if (city.toLowerCase().replace(/\s+/g, '-') === slug) {
          return {
            name: city,
            state: state.name,
            district: district.name,
            slug: slug,
            stateSlug: stateSlug,
            districtSlug: districtSlug,
            areas: district.areas || []
          }
        }
      }
      // Check areas
      if (district.areas) {
        for (const area of district.areas) {
          if (area.toLowerCase().replace(/\s+/g, '-') === slug) {
            return {
              name: area,
              isArea: true,
              city: district.cities[0],
              state: state.name,
              district: district.name,
              slug: slug,
              stateSlug: stateSlug,
              districtSlug: districtSlug
            }
          }
        }
      }
    }
  }
  
  return null
}

// Get all states
export const getAllStates = () => {
  return Object.entries(locationsData).map(([slug, data]) => ({
    slug,
    name: data.name,
    type: data.type
  }))
}

// Get districts for a state
export const getDistrictsForState = (stateSlug) => {
  const state = locationsData[stateSlug]
  if (!state) return []
  
  return Object.entries(state.districts).map(([slug, data]) => ({
    slug,
    name: data.name,
    cities: data.cities,
    areas: data.areas || []
  }))
}

// Major cities for homepage display (popular/tier-1 cities)
export const majorCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Goa',
  'Chennai', 'Kolkata', 'Chandigarh', 'Jaipur', 'Indore', 'Ahmedabad',
  'Surat', 'Lucknow', 'Nagpur', 'Visakhapatnam', 'Bhopal', 'Patna',
  'Vadodara', 'Agra', 'Nashik', 'Kochi', 'Coimbatore', 'Thane'
]

// Export total count
export const getTotalLocationsCount = () => {
  let count = 0
  Object.values(locationsData).forEach(state => {
    Object.values(state.districts).forEach(district => {
      count += district.cities.length
      if (district.areas) {
        count += district.areas.length
      }
    })
  })
  return count
}

// Get sub-locations for a city (areas, nearby cities in same district/state)
export const getSubLocationsForCity = (cityName) => {
  if (!cityName || cityName === 'all') return []
  
  const citySlug = cityName.toLowerCase().replace(/\s+/g, '-')
  const subLocations = []
  
  // Find the city in the data
  for (const [stateSlug, state] of Object.entries(locationsData)) {
    for (const [districtSlug, district] of Object.entries(state.districts)) {
      // Check if this is the city
      const cityMatch = district.cities.find(c => 
        c.toLowerCase().replace(/\s+/g, '-') === citySlug
      )
      
      if (cityMatch) {
        // Add areas for this district if available
        if (district.areas && district.areas.length > 0) {
          district.areas.forEach(area => {
            subLocations.push({
              name: area,
              type: 'area',
              parentCity: cityMatch,
              district: district.name,
              state: state.name
            })
          })
        }
        
        // Add other cities in same district
        district.cities.forEach(c => {
          if (c.toLowerCase() !== cityMatch.toLowerCase()) {
            subLocations.push({
              name: c,
              type: 'city',
              district: district.name,
              state: state.name
            })
          }
        })
        
        // Get nearby cities from other districts in same state (limited to 10)
        Object.entries(state.districts).forEach(([dSlug, d]) => {
          if (dSlug !== districtSlug) {
            d.cities.slice(0, 3).forEach(c => {
              subLocations.push({
                name: c,
                type: 'nearby',
                district: d.name,
                state: state.name
              })
            })
          }
        })
        
        return subLocations.slice(0, 20) // Limit results
      }
    }
  }
  
  return subLocations
}

// Popular areas for major cities (manually curated for SEO)
export const cityAreas = {
  mumbai: ['Bandra', 'Andheri', 'Juhu', 'Powai', 'Lower Parel', 'Worli', 'Colaba', 'Marine Lines', 'Malad', 'Goregaon', 'Chembur', 'Vashi', 'Thane', 'Navi Mumbai'],
  delhi: ['Connaught Place', 'Hauz Khas', 'Lajpat Nagar', 'Karol Bagh', 'Saket', 'Dwarka', 'Rohini', 'Vasant Kunj', 'Greater Kailash', 'Defence Colony', 'Noida', 'Gurgaon'],
  bangalore: ['MG Road', 'Koramangala', 'Indiranagar', 'Whitefield', 'Electronic City', 'HSR Layout', 'Jayanagar', 'JP Nagar', 'Marathahalli', 'Hebbal'],
  hyderabad: ['Banjara Hills', 'Jubilee Hills', 'Hitech City', 'Gachibowli', 'Madhapur', 'Secunderabad', 'Kukatpally', 'LB Nagar', 'Ameerpet', 'Begumpet'],
  pune: ['Koregaon Park', 'Hinjewadi', 'Kharadi', 'Magarpatta', 'Viman Nagar', 'Aundh', 'Baner', 'Wakad', 'Kalyani Nagar', 'Shivajinagar'],
  goa: ['Calangute', 'Baga', 'Candolim', 'Anjuna', 'Vagator', 'Panjim', 'Margao', 'Colva', 'Palolem', 'Morjim'],
  chennai: ['T Nagar', 'Anna Nagar', 'Adyar', 'Velachery', 'OMR', 'ECR', 'Nungambakkam', 'Mylapore', 'Besant Nagar', 'Guindy'],
  kolkata: ['Park Street', 'Salt Lake', 'New Town', 'Ballygunge', 'Esplanade', 'Howrah', 'Dum Dum', 'Tollygunge', 'Alipore', 'Lake Town'],
  jaipur: ['MI Road', 'C-Scheme', 'Civil Lines', 'Vaishali Nagar', 'Malviya Nagar', 'Jagatpura', 'Mansarovar', 'Tonk Road', 'Raja Park'],
  chandigarh: ['Sector 17', 'Sector 22', 'Sector 35', 'Sector 43', 'Mohali', 'Panchkula', 'Industrial Area', 'Manimajra'],
  ahmedabad: ['SG Highway', 'CG Road', 'Vastrapur', 'Prahlad Nagar', 'Navrangpura', 'Satellite', 'Maninagar', 'Ashram Road'],
  lucknow: ['Hazratganj', 'Gomti Nagar', 'Aliganj', 'Charbagh', 'Mahanagar', 'Aminabad', 'Indira Nagar', 'Alambagh'],
  kochi: ['MG Road', 'Marine Drive', 'Fort Kochi', 'Kakkanad', 'Edappally', 'Palarivattom', 'Ernakulam', 'Vyttila'],
  nashik: ['College Road', 'Gangapur Road', 'Indira Nagar', 'Panchavati', 'Satpur', 'Cidco', 'Nashik Road', 'Dwarka'],
  indore: ['Vijay Nagar', 'Palasia', 'Sapna Sangeeta', 'South Tukoganj', 'Race Course Road', 'Scheme 78', 'AB Road'],
  surat: ['Ring Road', 'Vesu', 'Adajan', 'Athwa', 'Piplod', 'Katargam', 'Varachha', 'Udhna'],
  vadodara: ['Alkapuri', 'Fatehgunj', 'Sayajigunj', 'Manjalpur', 'Gotri', 'Race Course', 'Vadiwadi'],
  nagpur: ['Dharampeth', 'Civil Lines', 'Sitabuldi', 'Sadar', 'Wardha Road', 'Manish Nagar', 'Hingna', 'Butibori'],
  visakhapatnam: ['Beach Road', 'Dwaraka Nagar', 'MVP Colony', 'Gajuwaka', 'Maddilapalem', 'Seethammadhara'],
  bhopal: ['MP Nagar', 'Arera Colony', 'New Market', 'Shahpura', 'Hoshangabad Road', 'Kolar Road', 'Habibganj'],
  coimbatore: ['RS Puram', 'Gandhipuram', 'Peelamedu', 'Saravanampatti', 'Singanallur', 'Town Hall', 'Race Course'],
  patna: ['Boring Road', 'Patna Junction', 'Kankarbagh', 'Ashok Rajpath', 'Bailey Road', 'Danapur', 'Rajendra Nagar']
}

// Get areas/localities for a specific city
export const getAreasForCity = (cityName) => {
  if (!cityName) return []
  const slug = cityName.toLowerCase().replace(/\s+/g, '-').replace(/-/g, '')
  const normalizedSlug = cityName.toLowerCase().replace(/\s+/g, '').replace(/-/g, '')
  
  // Check curated areas first
  const key = Object.keys(cityAreas).find(k => 
    k === slug || k === normalizedSlug || k.replace(/-/g, '') === normalizedSlug
  )
  
  if (key) {
    return cityAreas[key]
  }
  
  // Fallback to generated sub-locations
  const subLocations = getSubLocationsForCity(cityName)
  return subLocations.map(s => s.name)
}
