import random
import csv
import string
from datetime import date

name = r"C:\Users\rusel\Downloads\База данных имен и фамилий в формате CSV\russian_names.csv"
surname = r"C:\Users\rusel\Downloads\База данных имен и фамилий в формате CSV\russian_surnames.csv"
patronymics = r"C:\Users\rusel\Downloads\База данных имен и фамилий в формате CSV\russian_patronymics.csv"
base = r"C:\Users\rusel\Downloads\База данных имен и фамилий в формате CSV\import.csv"
name_male, surname_male, name_female = [], [], []
surname_female, patronymics_male, patronymics_female = [], [], []

columns = ['ФИО', 'Телефон', 'Электронная почта', 'СМС', 'Адрес', 'Заметка'
    , 'Дата рождения', 'Группа', 'Источник клиента', 'Код клиента',
           'Статус в программе лояльности', 'Баланс счета клиента', 'Баланс бонусного счета клиента',
           ]
with open(base, 'a', encoding='utf-8') as file:
    header = csv.DictWriter(file, delimiter=';', fieldnames=columns)
    header.writeheader()

with open(name, 'r', encoding='windows-1251', ) as file:
    info = csv.DictReader(file, delimiter=';')
    for i in info:
        if i['Пол'] == 'М':
            name_male.append(i['Имя'])
        else:
            name_female.append(i['Имя'])

with open(surname, 'r', encoding='windows-1251') as file:
    info = csv.DictReader(file, delimiter=';')
    for i in info:
        if i['Пол'] == 'М':
            surname_male.append(i['Фамилия'])
        else:
            surname_female.append(i['Фамилия'])

with open(patronymics, 'r', encoding='windows-1251', ) as file:
    info = csv.DictReader(file, delimiter=';')
    for i in info:
        if i['Пол'] == 'М':
            patronymics_male.append(i['Отчество'])
        else:
            patronymics_female.append(i['Отчество'])

def client_code(i):
    if i+1 == 1:
        return 'Код клиента', 1
    elif i+1 == 2:
        return 'Код клиента', 2
    x1, x2 = 1, 2
    for i in range(i-1):
        x3 = x1 + x2
        x1, x2 = x2, x3
    return 'Код клиента', x3

def phone_number(n=11):
    for i in range(n):
        a = random.sample([str(i) for i in range(10)], 10)
        phone_number = '+7' + ''.join(a)
    return "Телефон", phone_number

def email():
    mails_list = ['mail', 'gmail', 'yandex', 'list', 'box']
    com_ru = ['.com', '.ru']
    x = random.randint(1, 15)
    return 'Электронная почта', ''.join(random.choice(string.ascii_letters) for i in range(x)) + '@' \
           + random.choice(mails_list) + random.choice(com_ru)

def birth_date():
    start_date = date.today().replace(day=1, month=1, year=1970).toordinal()
    end_date = date.today().toordinal()
    random_day = date.fromordinal(random.randint(start_date, end_date))
    return "Дата рождения", random_day

def age(birth_date):
    now = date.today()
    age = now.year - birth_date[1].year - ((now.month, now.day) < (birth_date[1].month, birth_date[1].day))
    return age

def discount(age):
    if age > 30:
        return 'Статус в программе лояльности', '7% скидка на первую услугу\n10 постоянная'
    elif age < 20:
        return 'Статус в программе лояльности', '5% скидка на первую услугу\n10 постоянная'
    return 'Статус в программе лояльности', '3% скидка на первую услугу\n10 постоянная'

def random_name():
    male_or_female = ('М', 'Ж')
    sex = random.choice(male_or_female)
    if sex == 'М':
        return 'ФИО', f"{random.choice(surname_male)} {random.choice(name_male)} {random.choice(patronymics_male)}"
    return 'ФИО', f"{random.choice(surname_female)} {random.choice(name_female)} {random.choice(patronymics_female)}"

def data(i):
    date = birth_date()
    date_str = ('Дата рождения',date[1].strftime("%d.%m.%Y"))
    return random_name(), phone_number(), email(), client_code(i), date_str, discount(age(date))

def create_base(quantity):
    clients = dict.fromkeys(columns,'')
    for i in range(quantity):
        for k,v in data(i):
            clients[k] = v
        print(clients)
        with open(base, 'a', encoding='utf-8',newline='') as file:
            value = csv.DictWriter(file, delimiter=';',fieldnames=columns)
            value.writerow(clients)

create_base(50)