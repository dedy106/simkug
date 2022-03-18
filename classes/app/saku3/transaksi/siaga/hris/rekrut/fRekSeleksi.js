window.app_saku3_transaksi_siaga_hris_rekrut_fRekSeleksi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_rekrut_fRekSeleksi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_rekrut_fRekSeleksi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Seleksi Pelamar", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;datePicker");
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Seleksi",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,550,20],caption:"Keterangan", maxLength:200});		
		this.cb_lowong = new saiCBBL(this,{bound:[20,24,220,20],caption:"Lowongan Kerja", multiSelection:false, maxLength:3, tag:1,change:[this,"doChange"]});
		this.cb_proses = new saiCBBL(this,{bound:[20,15,220,20],caption:"Proses", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});

		this.pc1 = new pageControl(this,{bound:[10,12,1000,330], childPage:["Daftar Pelamar Pekerjaan"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:13,tag:1,
		            colTitle:["Kode","Nama Lowongan","Hasil","Hadir","Status","NIP","Nama","Alamat","Gender","Pendidikan","Jurusan","Perguruan Tinggi","IPK"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[60,100,100,100,60,200,150,80,70,70,150,100,70]],
					columnReadOnly:[true,[0,1,3,4,5,6,7,8,9,10,11,12],[2]],
					colHide:[[0,1],[true,true]],
					buttonStyle:[[0,3,4,5],[bsEllips,bsAuto,bsAuto,bsEllips]], 
					picklist:[[3,4],[new portalui_arrayMap({items:["OK","-"]}),new portalui_arrayMap({items:["OK","-"]})]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.kode_seb = "";

			this.cb_proses.setSQL("select kode_proses, nama, kode_seb from gr_rekrut_proses where kode_lokasi='"+this.app._lokasi+"'",["kode_proses","nama","kode_seb"],false,["Kode","Nama","Kode Seblm"],"and","Data Proses Rekrutasi",true);			
			this.cb_lowong.setSQL("select kode_job, nama from gr_rekrut_job where kode_lokasi='"+this.app._lokasi+"'  and datediff(day,tgl_selesai,getdate()) < 30",["kode_job","nama"],false,["Kode","Nama"],"and","Data Lowongan",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_rekrut_fRekSeleksi.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_rekrut_fRekSeleksi.implement({
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
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_rekrut_seleksi_m","no_seleksi",this.app._lokasi+"-SEL"+this.periode.substr(2,4)+".","000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					sql.add("insert into gr_rekrut_seleksi_m(no_seleksi,kode_lokasi,kode_proses,tanggal,keterangan,tgl_input,nik_user, kode_job) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_proses.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',getdate(),'"+this.app._userLog+"', '"+this.cb_lowong.getText()+"')");
				
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								
								if (this.sg.cells(3,i) == "OK" && this.sg.cells(4,i) == "OK") var flag_seleksi = this.cb_proses.getText();
								else var flag_seleksi = "-";
								sql.add("insert into gr_rekrut_seleksi_d(no_seleksi,kode_lokasi,kode_proses,kode_job,nip,flag_hadir,hasil,flag_seleksi,flag_status) values "+  
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_proses.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"','"+flag_seleksi+"','"+this.sg.cells(4,i)+"')");
							}
						}						
					}					
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :								
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.periode = (y+""+m);
		this.e_nb.setText("");
	},
	doChange:function(sender,col,row){		
		if ((sender == this.cb_lowong || sender == this.cb_proses) && this.cb_lowong.getText()!="" && this.cb_proses.getText()!="") {
			var data = this.dbLib.getDataProvider("select kode_seb from gr_rekrut_proses where kode_proses ='"+this.cb_proses.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.kode_seb = line.kode_seb;	
				}
			}

			var data = this.dbLib.getDataProvider("select e.kode_job,e.nama as nmjob, c.nip, d.nama as nmpelamar,  case when a.alamat <> '' then a.alamat else '-' end as alamat ,case when a.sex <> '' then a.sex else '-' end as sex,isnull(b.nama,'-') as pendidikan,isnull(f.nama,'-') as jurusan,case when a.univ <> '' then a.univ else '-' end as univ,case when a.alamat <> '' then a.ipk else 0 end as ipk "+
												"from gr_rekrut_pelamar a "+
												"		inner join gr_rekrut_seleksi_d c on c.nip = a.nip and c.kode_lokasi = a.kode_lokasi "+
												"		inner join gr_rekrut_pelamar d on d.nip = c.nip and d.kode_lokasi = c.kode_lokasi "+
												"		inner join gr_rekrut_job e on e.kode_job = c.kode_job and e.kode_lokasi = c.kode_lokasi "+
												"		left join gr_strata b on a.kode_strata=b.kode_strata and a.kode_lokasi=b.kode_lokasi "+												
												"		left join gr_jur f on a.kode_jur = f.kode_jur and a.kode_lokasi = f.kode_lokasi "+
												"       left join gr_rekrut_seleksi_d cc on cc.nip = a.nip and cc.kode_lokasi = a.kode_lokasi and cc.flag_seleksi in ('"+this.cb_proses.getText()+"','X') "+
												"where cc.nip is null and e.kode_job='"+this.cb_lowong.getText()+"' and c.flag_seleksi ='"+this.kode_seb +"' and c.kode_lokasi = '"+this.app._lokasi+"' ",true);
			if (typeof data != "string"){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line= data.rs.rows[i];					
					this.sg.appendData([line.kode_job, line.nmjob, '-','-','NO',line.nip, line.nmpelamar, line.alamat,line.sex, line.pendidikan, line.jurusan, line.univ, floatToNilai(line.ipk)]);
				}
			}			
			if (this.sg.getRowCount() == 0) this.sg.clear(1);
		}		
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_rekrut_seleksi_m","no_seleksi",this.app._lokasi+"-SEL"+this.periode.substr(2,4)+".","000"));
		this.e_ket.setFocus();
	},
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Lowongan",this.sg, this.sg.row, this.sg.col, 
														"select kode_job, nama  from gr_rekrut_job where kode_job='"+this.cb_lowong.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
														"select count(kode_job) from gr_rekrut_job where kode_job='"+this.cb_lowong.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
														 new Array("kode_job","nama"),"and",new Array("Kode","Nama"),false);					
						break;					

				case 5 :
						if (this.kode_seb == "-") {
							this.standarLib.showListDataForSG(this, "Daftar Pelamar",this.sg, this.sg.row, this.sg.col, 
															"select a.nip,a.nama    from gr_rekrut_pelamar a inner join gr_rekrut_job_pelamar b on a.nip=b.nip and a.kode_lokasi=b.kode_lokasi and b.kode_job='"+this.cb_lowong.getText()+"' where a.kode_lokasi='"+this.app._lokasi+"'",
															"select count(*) from (select a.nip,a.nama    from gr_rekrut_pelamar a inner join gr_rekrut_job_pelamar b on a.nip=b.nip and a.kode_lokasi=b.kode_lokasi and b.kode_job='"+this.cb_lowong.getText()+"' where a.kode_lokasi='"+this.app._lokasi+"')a",
															 new Array("nip","nama"),"and",new Array("NIP","Nama"),false);					
						}
						else {
							this.standarLib.showListDataForSG(this, "Daftar Pelamar",this.sg, this.sg.row, this.sg.col, 
															"select distinct a.nip,a.nama  from gr_rekrut_pelamar a inner join gr_rekrut_seleksi_d b on a.nip=b.nip and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"' and b.flag_seleksi='"+this.kode_seb+"'",
															"select count(distinct a.nip)  from gr_rekrut_pelamar a inner join gr_rekrut_seleksi_d b on a.nip=b.nip and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"' and b.flag_seleksi='"+this.kode_seb+"'",
															 new Array("a.nip","a.nama"),"and",new Array("NIP","Nama"),false);					
						}
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	doChangeCell: function(sender, col, row){
		if (col == 5 && this.sg.cells(5,row) != "") {
			this.sg.cells(0,row,this.cb_lowong.getText());
			this.sg.cells(1,row,this.cb_lowong.rightLabelCaption);

			var data = this.dbLib.getDataProvider("select "+
												"case when a.alamat='' then '-' else a.alamat end as alamat, "+
												"case when a.sex='' then '-' else a.sex end as sex, "+
												"isnull(b.nama,'-') as pendidikan,"+
												"isnull(c.nama,'-') as jurusan,"+
												"case when a.univ='' then '-' else a.univ end as univ,"+
												"case when a.ipk='' then '0' else a.ipk end as ipk "+												
												"from gr_rekrut_pelamar a "+
												"left join gr_strata b on a.kode_strata=b.kode_strata and a.kode_lokasi=b.kode_lokasi "+
												"left join gr_jur c on a.kode_jur=c.kode_jur and a.kode_lokasi=c.kode_lokasi "+
												"where a.nip ='"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.sg.setCell(7,row,line.alamat);
					this.sg.setCell(8,row,line.sex);
					this.sg.setCell(9,row,line.pendidikan);
					this.sg.setCell(10,row,line.jurusan);
					this.sg.setCell(11,row,line.univ);
					this.sg.setCell(12,row,floatToNilai(line.ipk));
				}
				else{
					this.sg.setCell(7,row,"");
					this.sg.setCell(8,row,"");
					this.sg.setCell(8,row,"");
					this.sg.setCell(10,row,"");
					this.sg.setCell(11,row,"");
					this.sg.setCell(12,row,"0");
				}
			}
		}
	},

	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
