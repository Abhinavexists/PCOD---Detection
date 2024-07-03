import streamlit as st
import pandas as pd
import matplotlib as plt
import numpy as np
import pickle
from PIL import Image
import altair as alt

image = Image.open("logo.png")

# Resize the image to the desired size
image = image.resize((500, 100))

# Display the image using the Streamlit Image function
st.image(image, use_column_width=True)

pickled_model = pickle.load(open('modelfinal1.pkl', 'rb'))

# standrdpickled_model(input_data_reshaped)

st.title(':red[OverianAI]')
st.title(':yellow[Ovarian AI - The Multidisciplinary Project Making a Difference]')
st.header(':orange[Revolutionize PCOS diagnosis with OverianAI]')
st.subheader('Introducing state-of-the-art AI-powered solution that can accurately detect Polycystic Ovary Syndrome (PCOS) with unprecedented precision!')
st.subheader("OverianAI's advanced machine learning models and data science techniques have been extensively tested and validated on a large dataset of patients, and have shown to provide highly accurate and reliable results.")


st.subheader(':red[Age VS Share of Respondents]')

df = pd.DataFrame({
    'Age group': ['<19', '20-29', '30-44', '45-59', '60>'],
    'Percentage': [3.8, 16.81, 11.58, 1.44, 0.55]
})

chart = alt.Chart(df).mark_bar(color='#FFA07A').encode(
    x=alt.X('Age group', title='Age group'),
    y=alt.Y('Percentage', title='Percentage'),
    text=alt.Text('Percentage', format='.1f'),
    color=alt.Color('Age group',)
).configure_axis(
    grid=False
).configure_view(
    strokeWidth=0
)

chart = chart.properties(
    width=alt.Step(40)  # adjust the width of the bars
)

st.header('')

st.altair_chart(chart, use_container_width=True)
st.title(":red[Start your diagnosis]")
# Getting input data from user



fields = ['Age(yrs)','Weight (Kg)', 'Height(Cm)', 'BMI', 'Blood Group', 'Pulse rate(bpm)', 'RR (breaths/min)', 'Hb(g/dl)', 'Cycle(R/I)', 'Cycle length(days)', 'Marraige Status (Yrs)', 'Pregnant(Y/N)', 'No. of aborptions', 'I beta-HCG(mIU/mL)', 'II beta-HCG(mIU/mL)', 'FSH(mIU/mL)', 'LH(mIU/mL)', 'FSH/LH', 'Hip(inch)', 'Waist(inch)', 'Waist:Hip Ratio', 'TSH (mIU/L)', 'AMH(ng/mL)',
          'PRL(ng/mL)', 'Vit D3 (ng/mL)', 'PRG(ng/mL)', 'RBS(mg/dl)', 'Weight gain(Y/N)', 'hair growth(Y/N)', 'Skin darkening (Y/N)', 'Hair loss(Y/N)', 'Pimples(Y/N)', 'Fast food (Y/N)', 'Reg.Exercise(Y/N)', 'BP _Systolic (mmHg)', 'BP _Diastolic (mmHg)', 'Follicle No. (L)', 'Follicle No. (R)', 'Avg. F size (L) (mm)', 'Avg. F size (R) (mm)', 'Endometrium (mm)']

# create an empty list to store input values
inputs = []

# take input for each field and append it to the inputs list
for field in fields:
    input_val = st.number_input(label=field)
    inputs.append(input_val)

# convert the inputs list to a 2D numpy array
inputs_arr = np.array(inputs).reshape(1, -1)

# display the inputs and the shape of the inputs array
a = st.button("Submit")
text = " "
if a:
    value = pickled_model.predict(inputs_arr)
    if value == 1:
        text = "you have probability of Polycystic Ovary Syndrome"
    else:
        text = "Your are not prone to Polycystic Ovary Syndrome"
    st.success("Diagnosis completed ✅")
    st.success(text)
    
st.text("Developed By")
st.text("Rakesh Kanneeswaran Maravar")    
st.text("B.Tech Computer Science and Technology")
st.text("Department of Computing Technologies")
st.text("SRM Institute of Science and Technology Chennai")

