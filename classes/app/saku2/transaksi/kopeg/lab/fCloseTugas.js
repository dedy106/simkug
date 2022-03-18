window.app_saku2_transaksi_kopeg_lab_fCloseTugas = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_lab_fCloseTugas.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_lab_fCloseTugas";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Closing Tugas Mahasiswa: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;wysiwyg;portalui_saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});		
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],visible:false}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Closing",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.cb_tugas = new saiCBBL(this,{bound:[20,22,222,20],caption:"No Tugas", multiSelection:false, maxLength:10,change:[this,"doChange"]});		
		this.e_dosen = new saiLabelEdit(this,{bound:[20,20,450,20],caption:"Dosen", readOnly:true});
		this.e_kajian = new saiLabelEdit(this,{bound:[20,21,450,20],caption:"Kajian", readOnly:true});
		this.e_matkul = new saiLabelEdit(this,{bound:[520,21,400,20],caption:"Mata Kuliah", readOnly:true});
		this.e_catatan = new saiMemo(this,{bound:[20,13,450,50],caption:"Catatan",tag:0});		
		this.e_kelas = new saiLabelEdit(this,{bound:[520,13,400,20],caption:"Kelas", readOnly:true});
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,320], childPage:["Deskripsi Tugas","Rincian Tugas","Data Transaksi","Detail Transaksi","Catatan"]});
		this.e_memo = new saiMemo(this.pc1.childPage[0],{bound:[5,10,this.pc1.width-10,this.pc1.height-20],caption:"",labelWidth:0, tag:2});						
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,10,this.pc1.width-5,this.pc1.height-40],colCount:4,tag:2,
		            colTitle:["Tanggal","Deskripsi","ID Soal","Jml Jawab"],
					colWidth:[[3,2,1,0],[80,80,600,100]],						
					dblClick:[this,"doDoubleClick"],readOnly:true, autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});
		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:6,tag:0,
		            colTitle:["No Bukti","ID Soal","Tanggal","Keterangan","Jenis","Posted"],
					colWidth:[[5,4,3,2,1,0],[80,50,400,70,80,150]],
					columnReadOnly:[true,[0,1,2,3,4,5],[]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:5,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai"],
					colWidth:[[4,3,2,1,0],[100,400,50,200,80]],
					colFormat:[[4],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});	
		
		this.mCatat = new wysiwyg(this.pc1.childPage[4],{bound:[1,10,this.pc1.width-25,this.pc1.height-125], withForm:false, tag:9});
		this.mCatat.display();
		this.mCatat.enable();
		
		
		this.e_memo.setReadOnly(true);
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);												
			this.cb_tugas.setSQL("select a.no_tugas, a.nama from lab_tugas a "+
			                     "       inner join lab_kelas_mhs c on a.kode_kelas=c.kode_kelas and a.kode_lokasi=c.kode_lokasi and c.nim ='"+this.app._userLog+"' "+
								 "       left join lab_close b on a.no_tugas=b.no_tugas and a.kode_lokasi=b.kode_lokasi and b.nik_user='"+this.app._userLog+"' "+
								 "where b.no_tugas is null and a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["no_tugas","nama"],false,["Kode","Nama"],"and","Daftar Tugas",true);
		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_lab_fCloseTugas.extend(window.childForm);
window.app_saku2_transaksi_kopeg_lab_fCloseTugas.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"lab_close","no_close",this.app._lokasi+"-CLS.","000000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into lab_close(no_close,no_tugas,kode_lokasi,tanggal,nik_user,catatan,nilai,evaluasi,no_eval) values  "+
							"('"+this.e_nb.getText()+"','"+this.cb_tugas.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_catatan.getText()+"','-','-','-')");
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
					this.sg.clear(1); this.sg1.clear(1); this.sg2.clear(1);
					setTipeButton(tbSimpan);
					this.pc1.setActivePage(this.pc1.childPage[0]);			
					this.doClick();
				break;
			case "simpan" :	
				var line;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					if (line.posted.toUpperCase() == "F"){
						system.alert(this,"Transaksi ada yang belum diposting.","No Bukti : "+line.no_bukti);
						return false;
					}
				}
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}			
		this.doClick();				
	},			
	doClick:function(sender){
		if (this.e_periode.getText()!= "" ) {				
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"lab_close","no_close",this.app._lokasi+"-CLS.","000000"));
			this.cb_tugas.setFocus();
		}
	},			
	doChange:function(sender){
		if (sender == this.cb_tugas && this.cb_tugas.getText()!="") {
			var data = this.dbLib.getDataProvider("select c.matkul,a.keterangan,b.nama as dosen,d.nama as kelas,c.nama+' - '+c.keterangan as kajian "+
			           "from lab_tugas a inner join lab_dosen b on a.kode_dosen = b.kode_dosen and a.kode_lokasi=b.kode_lokasi "+
					   "                 inner join lab_matkul c on a.kode_matkul=c.kode_matkul "+
					   "                 inner join lab_kelas d on a.kode_kelas=d.kode_kelas "+
			           "where a.no_tugas='"+this.cb_tugas.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_dosen.setText(line.dosen);					
					this.e_kajian.setText(line.kajian);
					this.e_matkul.setText(line.matkul);
					this.e_kelas.setText(line.kelas);
					this.e_memo.setText(line.keterangan);					
				} 
			}			
			var data = this.dbLib.getDataProvider("select a.tanggal,a.keterangan,a.nu,isnull(b.jml,0) as jml "+
			           "from lab_tugas_d a left join ("+
					   "             select no_tugas,kode_lokasi,id_soal,count(id_soal) as jml "+
					   "             from lab_ju_m where nik_user='"+this.app._userLog+"' and no_tugas='"+this.cb_tugas.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
					   "             group by no_tugas,kode_lokasi,id_soal) b on a.no_tugas=b.no_tugas and a.kode_lokasi=b.kode_lokasi and a.nu=b.id_soal "+
					   "where a.no_tugas='"+this.cb_tugas.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.tanggal,line.keterangan,line.nu,floatToNilai(line.jml)]);
				}
			} else this.sg1.clear(1);									
			strSQL = "select no_ju as no_bukti,id_soal,convert(varchar,tanggal,103) as tanggal,keterangan,'JU' as jenis,case posted when 'T' then 'POSTED' else 'UNPOSTED' end as posted "+
					 "from lab_ju_m "+
					 "where kode_lokasi='"+this.app._lokasi+"' and no_tugas='"+this.cb_tugas.getText()+"' and nik_user='"+this.app._userLog+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);					
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		}
	},
	doTampilData: function(page) {		
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.no_bukti,line.id_soal,line.tanggal,line.keterangan,line.jenis.toUpperCase(),line.posted.toUpperCase()]);
		}
		this.sg.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) != "" && this.sg.cells(4,row) != "") {
			var strSQL = "";
			switch(this.sg.cells(4,row)){
				case "JU" :
						strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,c.catatan "+
								 "from lab_ju_j a inner join lab_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and a.no_tugas=b.no_tugas and a.nik_user=b.nik_user "+									 
								 "                inner join lab_ju_m c on a.no_ju=c.no_ju and a.kode_lokasi=c.kode_lokasi and a.nik_user=c.nik_user "+
								 "where a.no_ju = '"+this.sg.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;				
			}
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai)]);
				}
			} else this.sg2.clear(1);
			this.mCatat.setCode(urldecode(line.catatan));
			this.pc1.setActivePage(this.pc1.childPage[2]);			
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.e_nb.getText()+")");							
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