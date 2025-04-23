const bloodCompatibilityData = {
    'A+': {
        canDonateTo: ['A+', 'AB+'],
        canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
        cssClass: 'a-pos'
    },
    'A-': {
        canDonateTo: ['A+', 'A-', 'AB+', 'AB-'],
        canReceiveFrom: ['A-', 'O-'],
        cssClass: 'a-neg'
    },
    'B+': {
        canDonateTo: ['B+', 'AB+'],
        canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
        cssClass: 'b-pos'
    },
    'B-': {
        canDonateTo: ['B+', 'B-', 'AB+', 'AB-'],
        canReceiveFrom: ['B-', 'O-'],
        cssClass: 'b-neg'
    },
    'AB+': {
        canDonateTo: ['AB+'],
        canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        cssClass: 'ab-pos'
    },
    'AB-': {
        canDonateTo: ['AB+', 'AB-'],
        canReceiveFrom: ['A-', 'B-', 'AB-', 'O-'],
        cssClass: 'ab-neg'
    },
    'O+': {
        canDonateTo: ['A+', 'B+', 'AB+', 'O+'],
        canReceiveFrom: ['O+', 'O-'],
        cssClass: 'o-pos'
    },
    'O-': {
        canDonateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        canReceiveFrom: ['O-'],
        cssClass: 'o-neg'
    }
};

const bloodFacts = {
    'A+': [
        '• A+ is the second most common blood type.',
        '• People with A+ blood have A antigens and the Rh factor.',
        '• About 34% of people have A+ blood type.'
    ],
    'A-': [
        '• A- blood is relatively uncommon.',
        '• People with A- blood have A antigens but lack the Rh factor.',
        '• A- can donate red blood cells to all A and AB blood types.'
    ],
    'B+': [
        '• B+ is found in about 9% of the population.',
        '• People with B+ blood have B antigens and the Rh factor.',
        '• B+ can receive platelets and plasma from all blood types.'
    ],
    'B-': [
        '• B- is one of the rarer blood types.',
        '• People with B- blood have B antigens but lack the Rh factor.',
        '• Only about 2% of the population has B- blood.'
    ],
    'AB+': [
        '• AB+ is the universal plasma donor.',
        '• AB+ is the universal recipient for red blood cells.',
        '• People with AB+ blood have both A and B antigens plus the Rh factor.',
        '• AB+ is the rarest ABO blood type.'
    ],
    'AB-': [
        '• AB- is extremely rare (less than 1% of the population).',
        '• People with AB- blood have both A and B antigens but lack the Rh factor.',
        '• AB- can receive red blood cells from all negative blood types.'
    ],
    'O+': [
        '• O+ is the most common blood type.',
        '• People with O+ blood have neither A nor B antigens, but have the Rh factor.',
        '• About 38% of people have O+ blood type.'
    ],
    'O-': [
        '• O- is the universal donor for red blood cells.',
        '• People with O- blood have neither A nor B antigens, and lack the Rh factor.',
        '• O- blood is in constant demand for emergency situations.'
    ]
};

const commonFacts = {
    'O': ['• O blood types don\'t have A or B antigens.'],
    'AB': ['• AB blood types have both A and B antigens.'],
    '-': ['• Negative blood types don\'t have the Rh factor.'],
    '+': ['• Positive blood types have the Rh factor.']
};

const dropdownToggle = document.getElementById('dropdown-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');
const selectedValue = document.getElementById('selected-value');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const bloodTypeButtons = document.querySelectorAll('.blood-type-btn');
const results = document.getElementById('results');
const bloodTypeCircle = document.getElementById('blood-type-circle');
const bloodTypeDisplay = document.getElementById('blood-type-display');
const donateGrid = document.getElementById('donate-grid');
const receiveGrid = document.getElementById('receive-grid');
const factsList = document.getElementById('facts-list');

dropdownToggle.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', (event) => {
    if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('show');
    }
});

dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        const value = item.getAttribute('data-value');
        selectedValue.textContent = value;
        selectedValue.style.fontWeight = 'bold';
        dropdownMenu.classList.remove('show');
        updateBloodTypeSelection(value);
    });
});

bloodTypeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const bloodType = button.getAttribute('data-type');
        selectedValue.textContent = bloodType;
        selectedValue.style.fontWeight = 'bold';
        updateBloodTypeSelection(bloodType);
    });
});

function updateBloodTypeSelection(bloodType) {
    bloodTypeButtons.forEach(btn => {
        if (btn.getAttribute('data-type') === bloodType) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });

    bloodTypeDisplay.textContent = bloodType;
    bloodTypeCircle.className = `blood-type-circle ${bloodCompatibilityData[bloodType].cssClass}`;
    
    results.classList.add('show');

    updateBloodTypesGrid(donateGrid, bloodCompatibilityData[bloodType].canDonateTo);
    
    updateBloodTypesGrid(receiveGrid, bloodCompatibilityData[bloodType].canReceiveFrom);

    updateFacts(bloodType);
}

function updateBloodTypesGrid(grid, bloodTypes) {
    grid.innerHTML = '';
    bloodTypes.forEach(type => {
        const div = document.createElement('div');
        div.className = `blood-type-tag ${bloodCompatibilityData[type].cssClass}`;
        div.textContent = type;
        grid.appendChild(div);
    });
}

function updateFacts(bloodType) {
    factsList.innerHTML = '';
    
    bloodFacts[bloodType].forEach(fact => {
        const li = document.createElement('li');
        li.textContent = fact;
        factsList.appendChild(li);
    });
    
    for (const [key, facts] of Object.entries(commonFacts)) {
        if (bloodType.includes(key)) {
            facts.forEach(fact => {
                const li = document.createElement('li');
                li.textContent = fact;
                factsList.appendChild(li);
            });
        }
    }
}