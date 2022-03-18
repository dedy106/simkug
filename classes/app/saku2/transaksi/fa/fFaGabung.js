window.app_saku2_transaksi_fa_fFaGabung = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_fa_fFaGabung.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_fa_fFaGabung";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penggabungan Data Aktiva Tetap", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Perolehan", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_fa = new saiLabelEdit(this,{bound:[20,10,202,20],caption:"No Aktap",readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,19,202,20],caption:"No Bukti",readOnly:true});
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,18,432,20],caption:"Deskripsi",maxLength:150,tag:1});				
		this.e_seri = new portalui_saiLabelEdit(this,{bound:[20,19,432,20],caption:"Nomor Seri",maxLength:50, tag:1});
		this.e_merk = new portalui_saiLabelEdit(this,{bound:[20,17,432,20],caption:"Merk",maxLength:100, tag:1});
		this.e_tipe = new portalui_saiLabelEdit(this,{bound:[20,16,432,20],caption:"Tipe",maxLength:100, tag:1});
		this.e_nilai = new saiLabelEdit(this,{bound:[20,18,202,20],caption:"Nilai Perolehan", tag:1, tipeText:ttNilai, text:"0"});		
		this.e_residu = new saiLabelEdit(this,{bound:[250,18,202,20],caption:"Nilai Residu", tag:1, tipeText:ttNilai, text:"0"});		
		this.l_tgl3 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tgl Awal Susut", underline:true});
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,12,100,18]}); 
		this.cb_pp1 = new saiCBBL(this,{bound:[20,18,205,20],caption:"PP Aktap", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.cb_pp2 = new saiCBBL(this,{bound:[20,19,205,20],caption:"PP Penyusutan", multiSelection:false, maxLength:10, tag:1});
		this.cb_klp = new saiCBBL(this,{bound:[20,13,205,20],caption:"Kelompok Aktap", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.cb_klpakun = new saiCBBL(this,{bound:[20,14,205,20],caption:"Kelompok Akun", readOnly:true, tag:1});
		this.e_akun = new portalui_saiLabelEdit(this,{bound:[20,15,432,20],caption:"Akun Aktap",readOnly:true});
		this.e_umur = new saiLabelEdit(this,{bound:[20,16,180,20],caption:"Umur [Bulan]", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_persen = new saiLabelEdit(this,{bound:[272,16,180,20],caption:"% Susut [Tahun]", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.c_jenis = new saiCB(this,{bound:[20,22,202,20],caption:"Jenis",items:["ASET","BDD"], readOnly:true});
		
		
		this.p1 = new panel(this,{bound:[20,23,900,200],caption:"Data Aset"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:11,tag:9,
		            colTitle:["No FA","Nama FA","No Seri","Merk","Tipe","PP","Akun Aset","Akun Akum.","Nilai Oleh","Tot Susut","N Buku"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[100,100,100,70,70,100,100,100,100,150,80]],
					columnReadOnly:[true,[0,1,2,3,5,6,7,8,9,10],[]],
					buttonStyle:[[0],[bsEllips]], checkItem:true,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],colFormat:[[8,9,10],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});	
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d2,this.dp_d2.year,this.dp_d2.month,this.dp_d2.day);
						
			this.cb_klp.setSQL("select kode_klpfa, nama from fa_klp where kode_lokasi='"+this.app._lokasi+"'",["kode_klpfa","nama"],false,["Kode","Nama"],"and","Data Kelompok Aktap",true);
			this.cb_pp1.setSQL("select kode_pp, nama from pp where tipe = 'posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp2.setSQL("select kode_pp, nama from pp where tipe = 'posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_fa_fFaGabung.extend(window.childForm);
window.app_saku2_transaksi_fa_fFaGabung.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var periode = this.dp_d2.getDateString().substr(0,4)+this.dp_d2.getDateString().substr(5,2);
					var periodeSusut = this.dp_d3.getDateString().substr(0,4)+this.dp_d3.getDateString().substr(5,2);
					
					sql.add("insert into fa_asset(no_fa,kode_lokasi,kode_klpfa,kode_klpakun,kode_akun,umur,persen,nama,merk,tipe,no_seri,nilai,nilai_residu,kode_pp,kode_pp_susut,tgl_perolehan,tgl_susut,periode,periode_susut,progress,nik_user,tgl_input,catatan,jenis) values "+
						    "('"+this.e_fa.getText()+"','"+this.app._lokasi+"','"+this.cb_klp.getText()+"','"+this.cb_klpakun.getText()+"','"+this.kodeakun+"',"+parseNilai(this.e_umur.getText())+","+parseNilai(this.e_persen.getText())+",'"+this.e_nama.getText()+"','"+this.e_merk.getText()+"','"+this.e_tipe.getText()+"','"+this.e_seri.getText()+"',"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_residu.getText())+",'"+this.cb_pp1.getText()+"','"+this.cb_pp2.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+periode+"','"+periodeSusut+"','2','"+this.app._userLog+"',getdate(),'"+this.e_nb.getText()+"','"+this.c_jenis.getText().substr(0,1)+"')");
					
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_fa);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.e_fa.setText("");
	},
	doClick:function(sender){
		this.e_fa.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fa_asset","no_fa",this.app._lokasi+"-FA"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_nb.setFocus();
	},
	doChange:function(sender){	
		if (sender == this.cb_klp && this.cb_klp.getText() != "") {
			var data = this.dbLib.getDataProvider(
			           "select a.kode_klpakun,b.nama,b.kode_akun,c.nama as nama_akun,b.umur,b.persen "+
					   "from fa_klp a "+
			           "	 inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi "+
					   "	 inner join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi "+
					   "where a.kode_klpfa = '"+this.cb_klp.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.cb_klpakun.setText(line.kode_klpakun,line.nama);
					this.e_akun.setText(line.kode_akun + " - "+line.nama_akun);
					this.kodeakun = line.kode_akun;
					this.e_umur.setText(floatToNilai(line.umur));
					this.e_persen.setText(floatToNilai(line.persen));
				} 
			} 
		}
	},
	
	doChangeCell: function(sender, col, row){
		if (col == 0) {
			var strSQL = "select a.no_seri,a.merk,a.tipe,a.nilai,a.nilai_residu,isnull(d.tot_susut,0) as tot_susut,(a.nilai-isnull(d.tot_susut,0)) as nilai_buku, "+
						 "  b.kode_akun,x.nama as nama_akun,b.akun_deprs,y.nama as nama_deprs,a.kode_pp,c.nama as nama_pp,a.umur "+
						 "from fa_asset a  "+
						 "inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi "+
						 "inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						 "inner join masakun x on b.kode_akun=x.kode_akun and b.kode_lokasi=x.kode_lokasi "+
						 "inner join masakun y on b.akun_deprs=y.kode_akun and b.kode_lokasi=y.kode_lokasi "+
						 "left join "+
						 "   (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
						 "	  from fasusut_d group by no_fa,kode_lokasi) d on a.no_fa=d.no_fa and a.kode_lokasi=d.kode_lokasi "+
						 "where a.no_fa='"+this.sg.cells(0,row)+"' and a.progress = '2' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){	
					this.sg.cells(2,row,line.no_seri);
					this.sg.cells(3,row,line.merk);
					this.sg.cells(4,row,line.tipe);
					this.sg.cells(5,row,line.kode_pp);
					this.sg.cells(6,row,line.kode_akun);
					this.sg.cells(7,row,line.akun_deprs);
					this.sg.cells(8,row,floatToNilai(line.nilai));
					this.sg.cells(9,row,floatToNilai(line.tot_susut));
					this.sg.cells(10,row,floatToNilai(line.nilai_buku));					
				}
			} 						
		}		
	},				
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Aset",sender,undefined, 
												    "select a.no_fa, a.nama from fa_asset a "+
													"    inner join (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
													"	             from fasusut_d group by no_fa,kode_lokasi) b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
													"                where a.progress ='2' and a.nilai-isnull(tot_susut,0)>=a.nilai_residu and a.kode_lokasi='"+this.app._lokasi+"'",
												    "select count(a.no_fa) from fa_asset a "+
													"    inner join (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
													"	             from fasusut_d group by no_fa,kode_lokasi) b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
													"                where a.progress ='2' and a.nilai-isnull(tot_susut,0)>=a.nilai_residu and a.kode_lokasi='"+this.app._lokasi+"'",
												  ["a.no_fa","a.nama"],"and",["No FA","Nama"],false);				
				}								
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},

	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_fa.getText()+")","");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});