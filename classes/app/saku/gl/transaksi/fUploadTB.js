window.app_saku_gl_transaksi_fUploadTB = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_transaksi_fUploadTB.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku_gl_transaksi_fUploadTB";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Upload TB", 0);	
		
		this.maximize();		
		uses("portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar");
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,10,182,20],caption:"Periode",readOnly:true});		
		this.lblTgl1 = new portalui_label(this,{bound:[20,32,101,18],caption:"Tanggal",underline:true});						
		this.dp_tgl1 = new portalui_datePicker(this,{bound:[120,32,82,18], selectDate:[this,"doSelectDate"]});		
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,78,230,20],caption:"No Bukti JU", readOnly:true});					
		this.bGen = new portalui_button(this,{bound:[256,78,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doClick"]});		   
		this.ed_dok = new portalui_saiLabelEdit(this,{bound:[20,100,310,20],caption:"No Dokumen",maxLength:50});
		this.ed_desc = new portalui_saiLabelEdit(this,{bound:[20,122,500,20],caption:"Deskripsi",maxLength:150});
		this.cb_curr = new portalui_saiCBBL(this,{bound:[20,144,185,20],caption:"Currency dan Kurs",text:"IDR",tag:9,readOnly:true});
		this.ed_kurs = new portalui_saiLabelEdit(this,{bound:[205,144,45,20],caption:"",labelWidth:0,tipeText:ttNilai, alignment:alRight, text:"1",readOnly:true});
		this.cb_pembuat = new portalui_saiCBBL(this,{bound:[20,166,185,20],caption:"Dibuat Oleh",readOnly:true,btnClick:[this,"FindBtnClick"]});
		this.ed_debet = new portalui_saiLabelEdit(this,{bound:[680,166,220,20],caption:"Total Debet",tipeText:ttNilai, alignment:alRight,readOnly:true,text:"0"});
		this.cb_setuju = new portalui_saiCBBL(this,{bound:[20,188,185, 20],caption:"Disetujui Oleh",readOnly:true,btnClick:[this,"FindBtnClick"]});		
		this.ed_kredit = new portalui_saiLabelEdit(this,{bound:[680,188, 220,20],caption:"Total Kredit",tipeText:ttNilai, alignment:alRight, text:"0",readOnly:true});		
		this.bGar = new portalui_imageButton(this,{bound:[900,188,22,22],hint:"Lihat Jurnal",image:"icon/"+system.getThemes()+"/tabCont2.png"});				
	    this.rearrangeChild(10,23);
		this.pc = new portalui_pageControl(this,{bound:[20,210,900,260],color:this.bgColor});	        	
		this.p1 = new portalui_childPage(this.pc,{caption:"Data Upload"});
		this.p2 = new portalui_childPage(this.pc,{caption:"Data Jurnal"});
		uses("portalui_saiGrid;portalui_sgNavigator");
    	this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,0,898,220],colCount:7,
				colTitle:["Kode Akun","Nama Akun","Kode PP","SaldoAwal","Debet","Kredit","Saldo Akhir"],readOnly:true,
				colFormat:[[3,4,5,6],[cfNilai, cfNilai, cfNilai, cfNilai]], colWidth:[[0,1,2,3,4,5,6],[100,200,100,100,100,100,100]]});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,230,898,25],buttonStyle:4, grid:this.sg1, afterUpload:[this,"doAfterUpload"]});		
		this.sgn.uploader.setParam3("object");
		this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,0,898,230],colCount:5,
				colTitle:["Kode Akun","Nama Akun","DC","Nilai","Kode PP"],readOnly:true,
				colFormat:[[3],[cfNilai]], colWidth:[[4,3,2,1,0],[100,100,80,200,100]]});
	    this.jenis = "JU";	
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
	}
};
window.app_saku_gl_transaksi_fUploadTB.extend(window.portalui_childForm);
window.app_saku_gl_transaksi_fUploadTB.implement({
	doAfterUpload: function(sender, result, data){		
		this.sg1.clear();
		this.sg1.showLoading();
		var line,data;
		var dataDebet = [], dataKredit = [];
		var totD = 0, totC = 0;
		for (var i in data.rows){
			line = data.rows[i];					
			if (line.debet != "0")
				dataDebet.push([line.kode_akun, line.nama, "D",floatToNilai(line.debet),line.kode_pp]);
			if (line.kredit != "0")
				dataKredit.push([line.kode_akun, line.nama, "C",floatToNilai(line.kredit),line.kode_pp]);
			totD += parseFloat(line.debet);
			totC += parseFloat(line.kredit);
			this.sg1.appendData([line.kode_akun, line.nama, line.kode_pp, floatToNilai(line.so_awal),floatToNilai(line.debet),floatToNilai(line.kredit),floatToNilai(line.so_akhir)]);
		}		
		this.ed_debet.setText(floatToNilai(totD));
		this.ed_kredit.setText(floatToNilai(totC));
		this.sg1.hideLoading();
		this.sg2.clear();
		for (var i in dataDebet)
			this.sg2.appendData(dataDebet[i]);		
		for (var i in dataKredit)
			this.sg2.appendData(dataKredit[i]);		
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");		
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");		
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");		
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");		
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(); this.sg1.appendRow(); 
				}
				break;
			case "simpan" :
					try{
                        var tgl = new Date();
            			uses("server_util_arrayList");
            			sql = new server_util_arrayList();            			
            			sql.add("insert into ju_m (no_ju,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,modul,jenis,"+
            					"             periode,kode_curr,kurs,nilai,nik_buat,nik_setuju,tgl_input,nik_user,posted,no_del,no_link,ref1) values  "+
            					"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','-','JU','"+this.jenis+"','"+
            					     this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_debet.getText())+",'"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+"',now(),'"+this.app._userLog+"','F','-','-','-')");
            			
            			for (var i=0; i < this.sg2.rows.getLength(); i++)
            			{			
            			     if (nilaiToFloat(this.sg2.getCell(3,i)) != 0){
                				sql.add("insert into ju_j (no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
                						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref, ket_ref) values "+	
                						"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+this.sg2.getCell(0,i)+
                						"','"+this.ed_desc.getText()+"','"+this.sg2.getCell(2,i).toUpperCase()+"',"+parseNilai(this.sg2.getCell(3,i))+",'"+this.sg2.getCell(4,i)+"','-',"+
                						"'-','-','-','-','-','-','"+this.app._lokasi+"','JU','"+this.jenis+"',"+
                						"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
                						",'"+this.app._userLog+"',now(),'-','-')");
    					       sql.add("insert into gldt (no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
                						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input, nilai_curr) values "+	
                						"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+i+",'"+this.sg2.getCell(0,i)+
                						"','"+this.ed_desc.getText()+"','"+this.sg2.getCell(2,i).toUpperCase()+"',"+parseNilai(this.sg2.getCell(3,i))+",'"+this.sg2.getCell(4,i)+"','-',"+
                						"'-','-','-','-','-','-','"+this.app._lokasi+"','JU','"+this.jenis+"',"+
                						"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
                						",'"+this.app._userLog+"',now(),"+parseNilai(this.sg2.getCell(3,i))+")");
					       }
            			}	
                        this.dbLib.execArraySQL(sql);					
					}catch(e){
						systemAPI.alert(e);
					}
				break;
		}
		this.dp_tgl1.setFocus();
	},
	doSelectDate: function(sender, y, m, d){		
		this.ed_period.setText(y+( m < 10 ? "0":"")+m);		
		this.bGen.click();
	},
	doClick: function(sender){
		this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ju_m","no_bukti","UPL/"+this.ed_period.getText().substr(2,4),"00000"));
	},
	doRequestReady : function(sender, methodName, result)
    {
    	if (sender == this.dbLib)
    	{
    		try
    		{   
    			switch(methodName)
        		{
        			case "execArraySQL" :
        				step="info";
    				if (result.toLowerCase().search("error") == -1)					
    				{
    					this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (no bukti : "+ this.ed_nb.getText()+")");
    					this.app._mainForm.bClear.click();              
    				}else system.info(this,result,"");
        			break;
          		break;
        		}    		
    		}
    		catch(e)
    		{
    			alert("step : "+step+"; error = "+e);
    		}
        }
    },
    FindBtnClick: function(sender, event)
    {
    	try
    	{
    		if (sender == this.cb_curr) 
    		{
    		    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
    										  "select kode_curr, nama  from curr",
    										  "select count(kode_curr) from curr",
    										  new Array("kode_curr","nama"),"where", new Array("Kode Curr","Deskripsi"),false);
    		}
    		if (sender == this.cb_pembuat) 
    		{   
    		    this.standarLib.showListData(this, "Daftar Petugas",this.cb_pembuat,undefined, 
    										  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
    										  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
    										  new Array("nik","nama"),"and", new Array("NIK","Nama"),false);
    		}
    		
    		if (sender == this.cb_setuju) 
    		{   
    		    this.standarLib.showListData(this, "Daftar yang Menyetujui",this.cb_setuju,undefined, 
    										  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
    										  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
    										  new Array("nik","nama"),"and", new Array("NIK","Nama"),false);
    		}
    	}
    	catch(e)
    	{
    		alert(e);
    	}
    }
});
