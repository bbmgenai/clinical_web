import PyPDF2

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in range(len(reader.pages)):
            text += f"\n--- Page {page+1} ---\n"
            text += reader.pages[page].extract_text()
    print(text)

extract_text_from_pdf('PSS_-_Photography_Book.pdf')
