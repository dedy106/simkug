window.app_saku3_transaksi_siaga_hris_kesehatan_fReimb = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_kesehatan_fReimb.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_kesehatan_fReimb";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reimburse Biaya Kesehatan dan Bantuan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker");
		uses("saiGrid",true);	
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[30,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[30,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[130,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
			
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Reimburse","Daftar Reimburse"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["No. Reimburse","Keterangan","Tgl. Kuitansi","NIK Pembuat","Progress"],
					colWidth:[[4,3,2,1,0],[100,100,100,350,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[10,12,200,20],caption:"No Reimburse",maxLength:30,readOnly:true,change:[this,"doChange"]});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[215,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[10,14,460,20],caption:"Keterangan", maxLength:100});		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[10,12,100,18],caption:"Tanggal Kuitansi", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[110,12,98,18],date:new Date().getDateStr()}); 
		this.cb_buat = new saiCBBL(this.pc1.childPage[0],{bound:[10,16,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[510,16,200,20],caption:"Total Reimburse", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[10,20,700,320], childPage:["Daftar Reimburse Kesehatan dan Bantuan"]});				
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["Kode Jenis","Keterangan","Saldo Plafon","Nilai","Status"],
					colWidth:[[4,3,2,1,0],[80,100,100,350,80]],
					columnReadOnly:[true,[0,1,2,4],[3]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[2,3],[cfNilai,cfNilai]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
	
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		setTipeButton(tbSimpan);	
		this.stsSimpan = 1;
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);	

			this.cb_buat.setSQL("select a.nik,a.nama from gr_karyawan a where a.kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			this.cb_buat.setText(this.app._userLog);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_kesehatan_fReimb.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_kesehatan_fReimb.implement({
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
					if (this.stsSimpan == 1) this.doClick(this.i_gen);									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_kes_m(no_kes,kode_lokasi,periode,tanggal,keterangan,nik_buat,tgl_kuitansi,tgl_input,nik_user,progress,no_pb) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.dp_d2.getDateString()+"',getdate(),'"+this.app._userLog+"','0','-')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								
								sql.add("insert into gr_kes_d(no_kes,kode_lokasi,nik,periode,kode_jenis,kode_loker,kode_grade,kode_klpjab,pasien,kode_akun,nilai,saldo) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_buat.getText()+"','"+this.e_periode.getText()+"','"+this.sg.cells(0,i)+"','"+this.kodeloker+"','"+this.kodeGrade+"','"+this.kodeklpjab+"','-','-','"+parseNilai(this.sg.cells(3,i))+"',"+parseNilai(this.sg.cells(2,i))+")");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_kes_m where no_kes='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_kes_d where no_kes='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into gr_kes_m(no_kes,kode_lokasi,periode,tanggal,keterangan,nik_buat,tgl_kuitansi,tgl_input,nik_user,progress,no_pb) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.dp_d2.getDateString()+"',getdate(),'"+this.app._userLog+"','0','-')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){										
								sql.add("insert into gr_kes_d(no_kes,kode_lokasi,nik,periode,kode_jenis,kode_loker,kode_grade,kode_klpjab,pasien,kode_akun,nilai,saldo) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_buat.getText()+"','"+this.e_periode.getText()+"','"+this.sg.cells(0,i)+"','"+this.kodeloker+"','"+this.kodeGrade+"','"+this.kodeklpjab+"','-','-','"+parseNilai(this.sg.cells(3,i))+"',"+parseNilai(this.sg.cells(2,i))+")");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_kes_m where no_kes='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_kes_d where no_kes='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.stsSimpan = 1;
					this.cb_buat.setSQL("select a.nik,a.nama from gr_karyawan a where a.kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
					if (this.stsSimpan == 1) this.doClick(this.i_gen);
				break;
			case "simpan" :	
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang dari nol.");
					return false;						
				}
			    for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if (nilaiToFloat(this.sg.cells(2,i)) < nilaiToFloat(this.sg.cells(3,i)) && this.sg.cells(4,i) == "CLOSE") {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Nilai melebihi Saldo [Baris "+k+"]");
							return false;						
						}
						/*dibuka aja...
						 * for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(3,j) == this.sg.cells(3,i) && this.sg.cells(5,j) == this.sg.cells(5,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data reimburse untuk baris ["+k+"]");
								return false;
							}
						}*/
					}
				}
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
		this.e_periode.setText(y+""+m);
		if (this.stsSimpan == 1) this.doClick(this.i_gen);		
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.cb_buat.setSQL("select a.nik,a.nama from gr_karyawan a where a.kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);					
		}
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_kes_m","no_kes",this.app._lokasi+"-REIM"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
	},
	doChange:function(sender){
		if (sender == this.cb_buat && this.cb_buat.getText()!=""){				
			if (this.stsSimpan == 1) this.sg.clear(1);

			var data = this.dbLib.getDataProvider("select a.kode_grade,a.kode_loker,b.kode_klpjab from gr_karyawan a inner join gr_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi where a.nik='"+this.cb_buat.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.kodeGrade = line.kode_grade;
					this.kodeloker = line.kode_loker;
					this.kodeklpjab = line.kode_klpjab;
				} 
			}		
		}
		if (sender == this.e_nb && this.e_nb.getText()!="" && this.stsSimpan == 0) {						
			var data = this.dbLib.getDataProvider(
					   "select a.tanggal,a.tgl_kuitansi,a.keterangan,a.nik_buat "+
					   "from gr_kes_m a "+					   
					   "where a.no_kes='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.dp_d1.setText(line.tanggal);					
					this.dp_d2.setText(line.tgl_kuitansi);					
					this.e_ket.setText(line.keterangan);
					this.cb_buat.setSQL("select a.nik,a.nama from gr_karyawan a where a.nik='"+line.nik_buat+"' and a.kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);																		
					this.cb_buat.setText(line.nik_buat);
				} 
			}			
			
			var data = this.dbLib.getDataProvider("select a.kode_jenis,c.nama as nama_jenis,a.saldo,a.nilai,a.pasien ,c.sts_open "+
					   "from gr_kes_d a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
					   "                inner join gr_kes_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi "+
					   "where a.no_kes='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_jenis,line.nama_jenis,floatToNilai(line.saldo),floatToNilai(line.nilai),line.sts_open]);
				}
			} else this.sg.clear(1);
		}		
	},	
	doEllipsClick: function(sender, col, row) {
		try{			
			switch(col){				
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Jenis Plafon",this.sg, this.sg.row, this.sg.col, 
														"select kode_jenis,nama from gr_kes_jenis where kode_lokasi='"+this.app._lokasi+"'",
														"select count(kode_jenis)  from gr_kes_jenis where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("kode_jenis","nama"),"and",new Array("Kode","Nama"),false);					
						break;											
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	doChangeCell: function(sender, col, row) {		
		if (col == 0) {				  
			var tahun = this.e_periode.getText().substr(0,4);

			if (this.sg.cells(0,row) != "") {
				var data = this.dbLib.getDataProvider("select sts_open from gr_kes_jenis where kode_jenis ='"+this.sg.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.sg.cells(4,row,line.sts_open);						
					}
				}

				var strSQL = "select a.nik, isnull(c.nilai,0) - isnull(b.nilai,0) as saldo "+
							 "from gr_karyawan a "+
							 
							 "left join ( "+
							 "			select nik,sum(case kode_jenis when '"+this.sg.cells(0,row)+"' then nilai else 0 end) as nilai "+
							 "		    from gr_kes_d "+
							 "		    where no_kes<>'"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and substring(periode,1,4)='"+tahun+"' and nik='"+this.cb_buat.getText()+"' "+
							 "		    group by nik "+
							 "		    ) b on b.nik=b.nik "+

							 "left join ( "+
							 "			select '"+this.cb_buat.getText()+"' as nik,nilai "+
							 "			from gr_kes_param "+
							 "			where tahun='"+tahun+"' and kode_grade='"+this.kodeGrade.substr(0,1)+"' and kode_klpjab='"+this.kodeklpjab+"' and kode_jenis='"+this.sg.cells(0,row)+"' "+
							 "		    ) c on a.nik=c.nik "+

							 "where a.nik='"+this.cb_buat.getText()+"'";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.sg.cells(2,row,floatToNilai(line.saldo));
					}
				}		
			}
		}

		if (col == 3) this.sg.validasi();
	},	
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.getCell(3,i) != ""){
					tot += nilaiToFloat(this.sg.getCell(3,i));			
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));										
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select no_kes,keterangan,nik_buat,convert(varchar,tgl_kuitansi,103) as tgl_kuitansi,progress "+
					 "from gr_kes_m "+
					 "where progress = '0' and periode ='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by no_kes desc";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},

	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_kes,line.keterangan,line.tgl_kuitansi,line.nik_buat,line.progress]); 
		}
		this.sg1.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
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
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
