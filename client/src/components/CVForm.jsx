import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export function CVForm({ onSubmit, defaultValues }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues
    });

    // When defaultValues change (like when loading a CV to edit), reset the form with those values
    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="cv-form">
            <h2>Personal Information</h2>
            <div className="form-group">
                <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Full Name"
                />
                {errors.name && <span className="error">{errors.name.message}</span>}
            </div>

            <div className="form-group">
                <input
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })}
                    placeholder="Email"
                    type="email"
                />
                {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
                <input
                    {...register("phone", {
                        pattern: {
                            value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
                            message: "Invalid phone number"
                        }
                    })}
                    placeholder="Phone (optional)"
                />
                {errors.phone && <span className="error">{errors.phone.message}</span>}
            </div>

            <h2>Education</h2>
            <div className="form-section">
                <div className="form-group">
                    <input
                        {...register("education.0.institution", { required: "Institution is required" })}
                        placeholder="Institution"
                    />
                    {errors.education?.[0]?.institution && (
                        <span className="error">{errors.education[0].institution.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <input
                        {...register("education.0.degree", { required: "Degree is required" })}
                        placeholder="Degree"
                    />
                    {errors.education?.[0]?.degree && (
                        <span className="error">{errors.education[0].degree.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <input
                        {...register("education.0.year", {
                            required: "Year is required",
                            pattern: {
                                value: /^(19|20)\d{2}$/,
                                message: "Enter a valid year"
                            }
                        })}
                        placeholder="Year"
                    />
                    {errors.education?.[0]?.year && (
                        <span className="error">{errors.education[0].year.message}</span>
                    )}
                </div>
            </div>

            <h2>Work Experience</h2>
            <div className="form-section">
                <div className="form-group">
                    <input
                        {...register("experience.0.company")}
                        placeholder="Company (optional)"
                    />
                </div>

                <div className="form-group">
                    <input
                        {...register("experience.0.position")}
                        placeholder="Position (optional)"
                    />
                </div>

                <div className="form-group">
                    <input
                        {...register("experience.0.duration")}
                        placeholder="Duration (optional)"
                    />
                </div>
            </div>

            <button type="submit" className="submit-btn">Generate CV</button>
        </form>
    );
}