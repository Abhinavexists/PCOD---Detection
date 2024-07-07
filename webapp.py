import streamlit as st
import pandas as pd
import altair as alt
import numpy as np
import pickle
from PIL import Image

# Load and resize the logo image
image = Image.open("logo.png")
image = image.resize((500, 100))
st.image(image, use_column_width=True)

# Load the pre-trained model
pickled_model = pickle.load(open('modelfinal1.pkl', 'rb'))

# Title and Subheaders
st.title(':red[OvarianAI]')
st.title(':yellow[Ovarian AI - The Multidisciplinary Project Making a Difference]')
st.header(':orange[Revolutionize PCOS diagnosis with OvarianAI]')
st.subheader('Introducing state-of-the-art AI-powered solution that can accurately detect Polycystic Ovary Syndrome (PCOS) with unprecedented precision!')
st.subheader("Random_name's advanced machine learning models and data science techniques have been extensively tested and validated on a large dataset of patients, and have shown to provide highly accurate and reliable results.")

# Age vs Share of Respondents chart
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
).configure_axis(grid=False).configure_view(strokeWidth=0).properties(width=alt.Step(40))
st.altair_chart(chart, use_container_width=True)

st.title(":red[Start your diagnosis]")

# Input fields
fields = ['Age(yrs)', 'Weight (Kg)', 'Height(Cm)', 'Blood Group', 'Pulse rate(bpm)', 'RR (breaths/min)', 'Hb(g/dl)', 'Cycle(R/I)', 'Cycle length(days)', 'Marital Status (Yrs)', 'Pregnant(Y/N)', 'No. of abortions', 'I beta-HCG(mIU/mL)', 'II beta-HCG(mIU/mL)', 'FSH(mIU/mL)', 'LH(mIU/mL)', 'FSH/LH', 'Hip(inch)', 'Waist(inch)', 'TSH (mIU/L)', 'AMH(ng/mL)', 'PRL(ng/mL)', 'Vit D3 (ng/mL)', 'PRG(ng/mL)', 'RBS(mg/dl)', 'Weight gain(Y/N)', 'Hair growth(Y/N)', 'Skin Darkening (Y/N)', 'Hair loss(Y/N)', 'Pimples(Y/N)', 'Fast food (Y/N)', 'Regular Exercise(Y/N)', 'BP Systolic (mmHg)', 'BP Diastolic (mmHg)', 'Follicle No. (L)', 'Follicle No. (R)', 'Endometrium (mm)']

inputs = {}

# Take input for each field
for field in fields:
    if field in ['Weight (Kg)', 'Height(Cm)']:
        input_val = st.number_input(label=field, min_value=0.01, key=f"input_{field}")
    else:
        input_val = st.number_input(label=field, key=f"input_{field}")
    inputs[field] = input_val

# Calculate BMI
height_m = inputs['Height(Cm)'] / 100  # convert cm to m
bmi = inputs['Weight (Kg)'] / (height_m ** 2) if height_m > 0 else 0
if height_m == 0:
    st.warning("Height must be greater than 0 to calculate BMI.")
inputs['BMI'] = bmi

# Calculate Waist-Hip Ratio
waist_hip_ratio = inputs['Waist(inch)'] / inputs['Hip(inch)'] if inputs['Hip(inch)'] > 0 else 0
if inputs['Hip(inch)'] == 0:
    st.warning("Hip measurement must be greater than 0 to calculate Waist-Hip Ratio.")
inputs['Waist-Hip Ratio'] = waist_hip_ratio

# Average follicle size
avg_f_size_l = st.number_input(label='Avg. F size (L) (mm)', min_value=0.0, key="avg_f_size_l")
avg_f_size_r = st.number_input(label='Avg. F size (R) (mm)', min_value=0.0, key="avg_f_size_r")
inputs['Avg. F size (L) (mm)'] = avg_f_size_l
inputs['Avg. F size (R) (mm)'] = avg_f_size_r

# Prepare input array
input_list = [inputs[field] for field in fields] + [inputs['BMI'], inputs['Waist-Hip Ratio'], inputs['Avg. F size (L) (mm)'], inputs['Avg. F size (R) (mm)']]
inputs_arr = np.array(input_list).reshape(1, -1)

# Submit button
submit_button = st.button("Submit", key="submit_button")
if submit_button:
    value = pickled_model.predict(inputs_arr)
    text = "You have a probability of Polycystic Ovary Syndrome" if value == 1 else "You are not prone to Polycystic Ovary Syndrome"
    st.success("Diagnosis completed ✅")
    st.success(text)

# Display calculated values
st.write(f"Calculated BMI: {bmi:.2f}")
st.write(f"Calculated Waist-Hip Ratio: {waist_hip_ratio:.2f}")
st.write(f"Avg. F size (L) (mm): {avg_f_size_l:.2f}")
st.write(f"Avg. F size (R) (mm): {avg_f_size_r:.2f}")
