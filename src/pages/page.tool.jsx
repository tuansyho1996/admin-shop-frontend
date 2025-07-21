import React, { useState } from 'react';
import KeywordReplacer from '../components/tool/tool.keyword.replacer';
import ConvertPrices from '../components/tool/tool.convert.prices';

function ToolPage() {



    return (
        <div className='w-full'>
            <KeywordReplacer />
            <ConvertPrices />
        </div>
    );
}

export default ToolPage;
