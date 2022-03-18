window.app_saku3_transaksi_yakes_inves_fDepoRekon = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fDepoRekon.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fDepoRekon";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Rekonsiliasi Bunga Deposito", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");

		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18]}); 	
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});				

		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Rekon","List Data"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:9,				
				colTitle:["No Rekon","Keterangan","Tanggal","Bank Depo","Nama Bank","Pilih"],
				colWidth:[[5,4,3,2,1,0],[70,200,80,80,250,100]],
				readOnly:true,
				colFormat:[[5],[cfButton]],
				click:[this,"doSgBtnClick3"], colAlign:[[5],[alCenter]],													 
				dblClick:[this,"doDoubleClick3"],defaultRow:1,autoAppend:false});
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_hitung = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,12,200,20],caption:"Total Hitung", tipeText:ttNilai, text:"0", readOnly:true});												
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});								
		this.e_bank = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total Bank", tipeText:ttNilai, text:"0", readOnly:true});												
		this.cb_bank = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Data Bank", multiSelection:false, maxLength:10, tag:2});		
		this.e_sls = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Total Selisih", tipeText:ttNilai, text:"0", readOnly:true});										
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Filter Tanggal", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,98,18]}); 		
		this.dp_d3 = new portalui_datePicker(this.pc2.childPage[0],{bound:[235,11,98,18]}); 	
		this.bLoad = new button(this.pc2.childPage[0],{bound:[385,11,80,18],caption:"Load Data",click:[this,"getData"]});					
		this.e_piutang = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,11,200,20],caption:"Total Piutang", tipeText:ttNilai, text:"0", readOnly:true});										

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,10,996,305], childPage:["Bunga Terbayar","Bunga OutStanding","Add On"]});					
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:11,tag:9,
				colTitle:["Status","No Depo","Keterangan","Tgl Mulai","Tgl Selesai","Jum Hari","Rate","Nota Konfirmasi","Bunga Hitung","Bruto Diterima","Selisih"],
				colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[50,80,80,120,50,50,70,70,200,100,60]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10],[]],
				colFormat:[[5,6,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				buttonStyle:[[0],[bsAuto]], 
				picklist:[[0],[new portalui_arrayMap({items:["APP","NONAPP"]})]],
				nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],
				autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});	

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:9,
				colTitle:["Status","No Depo","Keterangan","Tgl Mulai","Tgl Selesai","Jum Hari","Rate","Nota Konfirmasi","Bunga Piutang"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[80,120,50,50,70,70,200,100,60]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8],[]],
				colFormat:[[5,6,8],[cfNilai,cfNilai,cfNilai]],
				buttonStyle:[[0],[bsAuto]], 
				picklist:[[0],[new portalui_arrayMap({items:["APP","NONAPP"]})]],
				nilaiChange:[this,"doNilaiChange2"],change:[this,"doChangeCell2"],
				autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});	
		
		this.cb_ttd1 = new saiCBBL(this.pc1.childPage[2],{bound:[20,15,220,20],caption:"Diketahui Oleh", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_jab1 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,17,450,20],caption:"Jabatan", maxLength:100,tag:2});				

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
					
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			this.cb_bank.setSQL("select kode_bank, nama from inv_bank where flag_bdepo ='1'",["kode_bank","nama"],false,["Kode","Nama"],"and","Daftar Bank",true);			
			this.cb_ttd1.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.flag_aktif='1' and b.kode_bidang='4'",["nik","nama"],false,["NIK","Nama"],"where","Daftar Karyawan",true);			
			
			this.dp_d2.setText("01/04/2019");
			this.dp_d3.setText("30/06/2019");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fDepoRekon.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fDepoRekon.implement({
	getData: function() {
		this.sg.clear();
		var strSQL = "select "+
					 "a.no_depo,a.keterangan,c.noins,  "+
					 "a.nilai, convert(varchar,a.tgl_mulai,103) as tglmulai,convert(varchar,a.tgl_selesai,103) as tglselesai, "+
					 "datediff(day,a.tgl_mulai,a.tgl_selesai) as jumhari,a.p_bunga,  "+
					
					 "round( (a.p_bunga/a.basis/100) *  (datediff(day,a.tgl_mulai,a.tgl_selesai) * a.nilai * 0.8) ,2) as bunga_hitung, "+
					 "isnull(b.nilai_cair,0) as nilai_bank "+
					
					 "from inv_depo2_m a "+
					 "inner join inv_shop_m c on a.no_shop=c.no_shop "+
					 "left join ( "+
					 "	select no_depo,sum(nilai_cair) as nilai_cair "+ 
					 "	from inv_depoakru_d "+
					 "	where kode_lokasi ='99' group by no_depo "+
					 ") b on a.no_depo=b.no_depo  "+
					
					 "where a.tgl_selesai between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.bdepo = '"+this.cb_bank.getText()+"' "+
					 "order by a.no_depo";
					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;								
			for (var i in data.rs.rows){
				line = data.rs.rows[i];		
				var sls = Math.round(parseFloat(line.bunga_hitung) - parseFloat(line.nilai_bank));
				this.sg.appendData(["APP",line.no_depo,line.keterangan,line.tglmulai,line.tglselesai,line.jumhari,line.p_bunga,line.noins,floatToNilai(line.bunga_hitung),floatToNilai(line.nilai_bank),floatToNilai(sls)]);						
			}
		} else this.sg.clear(1);
		this.sg.validasi();

		this.sg2.clear();
		var strSQL = "select "+					 
					 "a.no_depo,a.keterangan,c.noins,  "+
					 "a.nilai, convert(varchar,a.tgl_mulai,103) as tglmulai,convert(varchar,a.tgl_selesai,103) as tglselesai, "+
					 "datediff(day,a.tgl_mulai,a.tgl_selesai) as jumhari,a.p_bunga, "+

					 "round((a.p_bunga/a.basis/100) *  (datediff(day,a.tgl_mulai,a.tgl_selesai) * a.nilai * 0.8),2) as bunga_hitung, "+
					 "isnull(b.nilai_cair,0) as nilai_bank "+

					 "from inv_depo2_m a "+
					 "inner join inv_shop_m c on a.no_shop=c.no_shop "+ 
					 "left join ( "+
					 "		select no_depo,sum(nilai_cair) as nilai_cair  "+
					 "		from inv_depoakru_d  "+
					 "		where kode_lokasi ='"+this.app._lokasi+"' group by no_depo "+
					 ") b on a.no_depo=b.no_depo  "+

					 "where a.tgl_mulai between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' and a.tgl_selesai>'"+this.dp_d3.getDateString()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.bdepo = '"+this.cb_bank.getText()+"' "+
					 "order by a.no_depo";



		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;								
			for (var i in data.rs.rows){
				line = data.rs.rows[i];		
				var sls = Math.round(parseFloat(line.bunga_hitung) - parseFloat(line.nilai_bank));
				this.sg2.appendData(["APP",line.no_depo,line.keterangan,line.tglmulai,line.tglselesai,line.jumhari,line.p_bunga,line.noins,floatToNilai(line.bunga_hitung)]);						
			}
		} else this.sg2.clear(1);
		this.sg2.validasi();


	},
	doChangeCell: function(sender, col, row){
		if (col == 0) this.sg.validasi();		
	},
	doNilaiChange: function(){
		try{			
			var tot1 = tot2 = 0 ;
			for (var i = 0; i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(0,i)=="APP" && this.sg.cells(8,i) != "" && this.sg.cells(9,i) != "" && this.sg.cells(10,i) != ""){										
					tot1 += nilaiToFloat(this.sg.cells(8,i));							
					tot2 += nilaiToFloat(this.sg.cells(9,i));							
				}
			}			
			this.e_hitung.setText(floatToNilai(Math.round(tot1)));			
			this.e_bank.setText(floatToNilai(Math.round(tot2)));			

			this.e_sls.setText(floatToNilai(Math.round(tot1-tot2)));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doChangeCell2: function(sender, col, row){
		if (col == 0) this.sg2.validasi();		
	},
	doNilaiChange2: function(){
		try{			
			var tot1 = 0 ;
			for (var i = 0; i < this.sg2.getRowCount();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="APP" && this.sg2.cells(8,i) != ""){										
					tot1 += nilaiToFloat(this.sg2.cells(8,i));												
				}
			}						
			this.e_piutang.setText(floatToNilai(Math.round(tot1)));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
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
	simpan: function(){			
		try{						
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from inv_deporekon_m where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_deporekon_d where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into inv_deporekon_m (no_rekon,kode_lokasi,tanggal,keterangan,kode_bank,periode,tgl_awal,tgl_akhir,nik_ttd1,jab1,tgl_input,nik_user,n_selisih) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_bank.getText()+"','"+this.e_periode.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+this.cb_ttd1.getText()+"','"+this.e_jab1.getText()+"',getdate(),'"+this.app._userLog+"',"+nilaiToFloat(this.e_sls.getText())+")");				
												
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i)=="APP") {																					
							sql.add("insert into inv_deporekon_d (no_rekon,kode_lokasi,no_depo,n_yakes,n_bank,selisih,jenis) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(1,i)+"',"+nilaiToFloat(this.sg.cells(8,i))+","+nilaiToFloat(this.sg.cells(9,i))+","+nilaiToFloat(this.sg.cells(10,i))+",'BAST')");											
						}	
					}

					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="APP") {																					
							sql.add("insert into inv_deporekon_d (no_rekon,kode_lokasi,no_depo,n_yakes,n_bank,selisih,jenis) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(1,i)+"',"+nilaiToFloat(this.sg2.cells(8,i))+",0,0,'PIUTANG')");											
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
					setTipeButton(tbSimpan);
					this.doClick(this.i_gen);
					this.stsSimpan = 1;
					this.sg.clear(1);		
					this.sg2.clear(1);		
					this.sg3.clear(1);					
					this.pc2.setActivePage(this.pc2.childPage[0]);																		
					this.pc1.setActivePage(this.pc1.childPage[0]);
				break;
			case "simpan" :			
			case "ubah" :						
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				
				if (nilaiToFloat(this.e_hitung.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Rekon tidak boleh nol atau kurang.");
					return false;						
				}				
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.preView = "0";
					
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from inv_deporekon_m where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from inv_deporekon_d where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
				
				break;	
		}
	},
	doSelectDate: function(sender, y,m,d){				
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);					
		if (this.stsSimpan==1) this.doClick(this.i_gen);		
	},
	doChange:function(sender){		
		if (this.stsSimpan == 1) {						
			if (sender == this.cb_ttd1 && this.cb_ttd1.getText()!="" ) {
				var strSQL = "select jabatan from karyawan where nik ='"+this.cb_ttd1.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_jab1.setText(line.jabatan);
					}				
				}	
			}

		}			
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if (this.stsSimpan == 0) {
				this.sg.clear(1);
				this.sg2.clear(1);
			}
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_deporekon_m","no_rekon",this.app._lokasi+"-RKN"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)	{																	
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi. (Bukti : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						} 
						else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad3:function(sender){																									
		var strSQL = "select a.no_rekon,a.keterangan,convert(varchar,a.tanggal,103) as tgl,a.kode_bank,b.nama as bank "+
					 "from inv_deporekon_m a inner join inv_bank b on a.kode_bank=b.kode_bank "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.sg3.clear();
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);	
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_rekon,line.keterangan,line.tgl,line.kode_bank,line.bank,"Pilih"]);
		}
		this.sg3.setNoUrut(start);	
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 5) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {		
		try{
			var baris = row;
			if (this.sg3.cells(0,baris) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,baris));								
								
				var strSQL = "select * from inv_deporekon_m where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.e_ket.setText(line.keterangan);
						this.cb_bank.setText(line.kode_bank);
						this.dp_d2.setText(line.tgl_awal);
						this.dp_d3.setText(line.tgl_akhir);						
					}
				}	
				
				this.sg.clear(); 
				var strSQL = "select b.no_depo,b.keterangan,convert(varchar,b.tgl_mulai,103) as tglmulai,convert(varchar,b.tgl_selesai,103) as tglselesai,c.noins, "+
							 "datediff(day,b.tgl_mulai,b.tgl_selesai) as jumhari,b.p_bunga,a.n_yakes,a.n_bank,a.selisih "+
							 "from inv_deporekon_d a "+
							 "inner join inv_depo2_m b on a.no_depo=b.no_depo "+
							 "inner join inv_shop_m c on b.no_shop=c.no_shop "+
							 "where a.no_rekon='"+this.e_nb.getText()+"' and a.jenis='BAST' order by b.no_depo";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg.appendData(["APP",line.no_depo,line.keterangan,line.tglmulai,line.tglselesai,line.jumhari,line.p_bunga,line.noins,floatToNilai(line.n_yakes),floatToNilai(line.n_bank),floatToNilai(line.selisih)]);						
					}
				} else this.sg.clear(1);

				this.sg2.clear(); 
				var strSQL = "select b.no_depo,b.keterangan,convert(varchar,b.tgl_mulai,103) as tglmulai,convert(varchar,b.tgl_selesai,103) as tglselesai,c.noins, "+
							 "datediff(day,b.tgl_mulai,b.tgl_selesai) as jumhari,b.p_bunga,a.n_yakes,a.n_bank,a.selisih "+
							 "from inv_deporekon_d a "+
							 "inner join inv_depo2_m b on a.no_depo=b.no_depo "+
							 "inner join inv_shop_m c on b.no_shop=c.no_shop "+
							 "where a.no_rekon='"+this.e_nb.getText()+"' and a.jenis='PIUTANG' order by b.no_depo";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg2.appendData(["APP",line.no_depo,line.keterangan,line.tglmulai,line.tglselesai,line.jumhari,line.p_bunga,line.noins,floatToNilai(line.n_yakes)]);						
					}
				} else this.sg2.clear(1);
		

				this.sg.validasi();
				this.sg2.validasi();
			}
		} catch(e) {alert(e);}		
	}
	
});