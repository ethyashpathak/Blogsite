import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'
import conf from '../conf/conf'


export default function RTE({name,control,label,defaultValue="" ,theme="light"}) {
    const isDark = theme === "dark";
  const editorKey = `editor-${isDark ? "dark" : "light"}`;

    return (
      <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      
      <Controller
      name={name || "content"}
      control={control}
      render={({field: {onChange}})=>(
         <Editor
         key={editorKey}
        apiKey={conf.appwriteTinymceKey}
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            skin: isDark ? "oxide-dark" : "oxide",
              content_css: isDark ? "dark" : "default",
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor |language| alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            content_langs: [
    { title: 'English', code: 'en' },
    { title: 'Spanish', code: 'es' },
    { title: 'French', code: 'fr' },
    { title: 'German', code: 'de' },
    { title: 'Portuguese', code: 'pt' },
    { title: 'Chinese', code: 'zh' }
  ]

        }}
        onEditorChange={onChange}
        />
      )}
      />

      </div>
    )
}

