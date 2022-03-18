window.app_saku_dmt_transaksi_fPddk = function(owner)
{
	if (owner)
	{
		window.app_saku_dmt_transaksi_fPddk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_dmt_transaksi_fPddk";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Adjusment PDD: Koreksi", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator"),uses("app_saku_fJurnalViewer",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode", readOnly:true, tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});		
		this.e_kb = new portalui_saiCBBL(this,{bound:[20,13,250,20],caption:"No Jurnal",btnClick:[this,"doBtnClick"],tag:1,rightLabelVisible:false,readOnly:true});						
		this.bLoad = new portalui_imageButton(this,{bound:[270,13,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,24,250,20],caption:"No Dokumen", maxLength: 50});
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,23,480,20],caption:"Keterangan",maxLength:150,tag:1});
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[730,23,200,20],caption:"Total Nilai",tipeText:ttNilai,readOnly:true, text: "0"});
											
		this.p1 = new portalui_panel(this,{bound:[20,30,910,350],caption:"Data Billing"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,910,325],colCount:9,colTitle:["No Bill","Tanggal","Keterangan","No Kontrak","Jml PDD","Jml Rkls","Akun Pdd","Akun Pdpt","Nilai"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[100,80,200,120,60,60,70,70,100]], colFormat:[[4,5,8],[cfNilai,cfNilai,cfNilai]],defaultRow:1, nilaiChange:[this, "doSgChange"],
					readOnly: true ,autoAppend:false});						
		
		
		this.rearrangeChild(10, 22);		
		setTipeButton(tbAllFalse);
		this.setTabChildIndex();
		try
		{		    
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
			uses("util_addOnLib");
		    this.addOnLib = new util_addOnLib();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();						
			
			this.jurnal = new app_saku_fJurnalViewer(this.app,{bound:[0,0,system.screenWidth,system.screenHeight],visible:false});						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_dmt_transaksi_fPddk.extend(window.portalui_childForm);
window.app_saku_dmt_transaksi_fPddk.implement({
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
					
					if (this.dataJurnal2 !== undefined && this.dataJurnal2.rs.rows[0] !== undefined){
						if (this.e_periode.getText() > this.app._periode)
							sql.add("delete from dmt_pdd_j where no_pdd = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						else if (this.e_periode.getText() == this.app._periode){
							if (this.dataJurnal2.rs.rows[0].posted == "T")
								throw("data sudah terposting, transaksi dibatalkan.");
							else sql.add("delete from dmt_pdd_j where no_pdd = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						}else {	
						    var nbBaru = this.standarLib.noBuktiOtomatis(this.dbLib,"dmt_pdd_m","no_pdd",this.app._lokasi+"-PDD"+this.e_periode.getText().substr(2,4)+".","00000");							
							var d ="";
							for (var i in this.dataJurnal2.rs.rows){
								if (i >0) d+=",";
								line = this.dataJurnal2.rs.rows[i];
								d+="('"+this.e_kb.getText()+"','"+this.app._lokasi+"',"+i+",'"+line.kode_akun+"','"+(line.dc.toUpperCase() == "D" ? "C":"D")+"','"+line.keterangan+"','"+line.kode_pp+"','"+line.kode_drk+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','IDR',1)";
							}
							sql.add(d);
						}						
					}else sql.add("delete from dmt_pdd_j where no_pdd = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");					
					
					sql.add("delete from dmt_pdd_d where no_pdd = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");					
					sql.add("update dmt_pdd set no_pdd= '"+(nbBaru === undefined ? this.e_kb.getText() : nbBaru)+"', no_dokumen='"+this.e_dok.getText()+"',tanggal='"+this.dp_d1.getDateString()+"', periode='"+this.e_periode.getText()+"', "+
						"	keterangan='"+this.e_ket.getText()+"', "+
						"	, nilai= '"+parseNilai(this.e_nilai.getText())+"',nik_user='"+this.app._userLog+"',tgl_input=now() "+
						"	where no_pdd = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					
					
					if (this.sg.getRowValidCount() > 0){
						var d="insert into dmt_pdd_d(no_pdd, kode_lokasi, no_bill, nilai, periode,akun_pdd,akun_pdpt)values";
						var ix = 0;						
						var listBill = "";
						for (var i=0;i < this.sg.getRowCount();i++){
							if (ix > 0) {d+= ","; listBill += ",";}
							d += "('"+(nbBaru === undefined ? this.e_kb.getText() : nbBaru)+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(8,i))+",'"+this.e_periode.getText()+"','"+this.sg.cells(6,i)+"','"+this.sg.cells(7,i)+"')";
							listBill += "'"+this.sg.cells(0,i)+"'";
							ix++;
						}	
						sql.add(d);
						
						var pNext = nextNPeriode(this.e_periode.getText(),1);
						sql.add(" update dmt_billing set per_flag='"+pNext+"' "+
							    " where kode_lokasi = '"+this.app._lokasi+"' and per_flag ='"+this.e_periode.getText()+"' and no_bill in ("+listBill+")");
					}
					this.createJurnal();
					var d = "insert into dmt_pdd_j(no_pdd,kode_lokasi,no_urut,kode_akun,dc,nilai,keterangan,kode_pp, kode_drk,periode,tanggal,kode_curr,kurs) values ";
					for (var i in this.dataJurnal.rs.rows){
						if (i >0) d+=",";
						line = this.dataJurnal.rs.rows[i];
						d+="('"+(nbBaru === undefined ? this.e_kb.getText() : nbBaru)+"','"+this.app._lokasi+"',"+i+",'"+line.kode_akun+"','"+line.dc+"',"+line.nilai+",'"+line.keterangan+"','"+line.kode_pp+"','"+line.kode_drk+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','IDR',1)";
					}
					sql.add(d);					
					
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
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_kb);
					this.sg.clear(1);
				}
				break;			
			case "ubah" :	
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				var data = this.dbLib.getDataProvider("select no_invoice from dmt_invoice_d where no_bill = '"+this.e_kb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof(data) == "object"){
					if (data.rs.rows[0] !== undefined){
						system.alert(this,"Bill sudah ditagihkan.","Data tidak dapat diubah.");
						return false;
					}
				}
				var data = this.dbLib.getDataProvider("select no_pdd from dmt_pdd_d where no_bill = '"+this.e_kb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof(data) == "object"){
					if (data.rs.rows[0] !== undefined){
						system.alert(this,"Bill sudah di reklas pdd.","Data tidak dapat diubah.");
						return false;
					}
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;				
			case "hapus" : 
				var data = this.dbLib.getDataProvider("select no_invoice from dmt_invoice_d where no_bill = '"+this.e_kb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof(data) == "object"){
					if (data.rs.rows[0] !== undefined){
						system.alert(this,"Bill sudah ditagihkan.","Data tidak dapat dihapus.");
						return false;
					}
				}
				var data = this.dbLib.getDataProvider("select no_pdd from dmt_pdd_d where no_bill = '"+this.e_kb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof(data) == "object"){
					if (data.rs.rows[0] !== undefined){
						system.alert(this,"Bill sudah di reklas pdd.","Data tidak dapat dihapus.");
						return false;
					}
				}
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.dataJurnal2 !== undefined && this.dataJurnal2.rs.rows[0] !== undefined){
						if (this.e_periode.getText() > this.app._periode)
							sql.add("delete from dmt_pdd_j where no_pdd = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						else if (this.e_periode.getText() == this.app._periode){
							if (this.dataJurnal2.rs.rows[0].posted == "T")
								throw("data sudah terposting, transaksi dibatalkan.");
							else sql.add("delete from dmt_pdd_j where no_pdd = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						}else {	
						    var nbBaru = this.standarLib.noBuktiOtomatis(this.dbLib,"dmt_pdd_m","no_pdd",this.app._lokasi+"-PDD"+this.e_periode.getText().substr(2,4)+".","00000");							
							for (var i in this.dataJurnal2.rs.rows){
								if (i >0) d+=",";
								line = this.dataJurnal2.rs.rows[i];
								d+="('"+this.e_kb.getText()+"','"+this.app._lokasi+"',"+i+",'"+line.kode_akun+"','"+(line.dc.toUpperCase() == "D" ? "C":"D")+"','"+line.keterangan+"','"+line.kode_pp+"','"+line.kode_drk+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','IDR',1 )";
							}
						}						
					}else sql.add("delete from dmt_pdd_j where no_pdd = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					
					sql.add("delete from dmt_pdd_d where no_pdd = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");															
					sql.add("delete from dmt_pdd_m where no_pdd = '"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					
					var listBill = "";
					for (var i=0;i < this.sg.getRowCount();i++){
						if (ix > 0) {d+= ","; listBill += ",";}
						listBill += "'"+this.sg.cells(0,i)+"'";
						ix++;
					}
					sql.add(" update dmt_billing set per_flag='"+getPrevPeriode(this.e_periode.getText())+"' "+
							" where kode_lokasi = '"+this.app._lokasi+"' and per_flag ='"+this.e_periode.getText()+"' and no_bill in ("+listBill+")");
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;
		}
	},
	doLoadClick: function(sender){
		try{			
			if (this.e_kb.getText() != ""){
				this.sg.clear(1);				
				var data = this.dbLib.getDataProvider("select y.no_dokumen,y.keterangan,y.periode,y.posted, "+
				        "        a.no_bill,date_format(a.tanggal,'%d/%m/%Y')as tanggal,a.keterangan,f.no_kontrak,a.jumlah,jml_pdd,a.akun_pdd,f.akun_pdpt,(a.nilai/a.jumlah) as nilai "+						
						"   from dmt_billing a "+
						"          inner join dmt_kontrak f on a.no_kontrak=f.no_kontrak and a.kode_lokasi=f.kode_lokasi "+
						"          inner join dmt_pdd_d x on a.no_bill=x.no_bill and a.kode_lokasi=x.kode_lokasi "+
						"          inner join dmt_pdd_m y on x.no_pdd=y.no_pdd and x.kode_lokasi=y.kode_lokasi "+
						"   where a.kode_lokasi = '"+this.app._lokasi+"' and x.no_pdd <= '"+this.e_kb.getText()+"' order by a.no_bill",true);												
				
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.no_bill, line.tanggal, line.keterangan, line.no_kontrak, floatToNilai(line.jumlah), floatToNilai(line.jml_pdd),line.akun_pdd,line.akun_pdpt, floatToNilai(line.nilai)]);
					}					
					this.doSgChange(this.sg, 3, 0);
					if (line !== undefined){
						this.e_ket.setText(line.keterangan);						
						this.e_dok.setText(line.no_dokumen);						
						this.posted = line.posted;						
						this.perLama = line.periode;						
						
						data = this.dbLib.getDataProvider("select * from dmt_pdd_j where no_pdd='"+this.e_kb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						eval("data = "+data+";");
						this.dataJurnal2 = data;						
						
						setTipeButton(tbUbahHapus);												
					}else setTipeButton(tbAllFalse);
				}
			}
		}catch(e){
			systemAPI.alert(e, data);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.e_kb) {   
			    this.standarLib.showListData(this, "Daftar Reklas PDD",sender,undefined, 
											  " select a.no_pdd, a.keterangan from dmt_pdd_m a "+
											  "	where a.kode_lokasi='"+this.app._lokasi+"' ",
											  " select count(a.no_pdd) from dmt_pdd_m a "+
											  " where a.kode_lokasi='"+this.app._lokasi+"' ",
											  ["a.no_pdd","a.keterangan"],"and",["No PDD","Keterangan"],false);							
			this.standarLib.clearByTag(this, new Array("1"),undefined);
			this.sg.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No PDD : "+ this.e_kb.getText()+")");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
					case "getDataProvider" :						
						this.akunIM = "-";
						this.namaIM = "-";
						if (result.toLowerCase().search("error") == -1){
							eval("data = "+result+";");
							if (data.rs.rows[0] !== undefined){
								this.akunIM = data.rs.rows[0].flag;
								this.namaIM = data.rs.rows[0].nama;
							}
						}else throw(result);
					break;
	    		}    		
			}catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.e_kb !== undefined) this.e_kb.click();
	},
	doSgChange: function(sender, col, row){
		var tot = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if (this.sg.cells(8,i) != "")
				tot += nilaiToFloat(this.sg.cells(8,i)) ;
		}
		this.e_nilai.setText(floatToNilai(tot));
	},
	createJurnal: function(){				
		try{
			var rows = [];
			for (var i=0;i < this.sg.getRowCount();i++){
				if (nilaiToFloat(this.sg.cells(8,i)) != 0){
					var temu = false;
					for (var j in rows){
						if (rows[j].kode_akun == this.sg.cells(6,i)){
							rows[j].nilai += nilaiToFloat(this.sg.cells(8,i));
							temu = true;
						}
					}
					if (!temu){
						rows[rows.length] = {kode_akun:this.sg.cells(6,i),nama:'-',dc:"D", keterangan:this.e_ket.getText(), nilai: nilaiToFloat(this.sg.cells(8,i)),kode_pp:this.app._kodePP, kode_drk:'-'};
					}
					
					var temu = false;
					for (var k in rows){
						if (rows[k].kode_akun == this.sg.cells(7,i)){
							rows[k].nilai += nilaiToFloat(this.sg.cells(8,i));
							temu = true;
						}
					}
					if (!temu){
						rows[rows.length] = {kode_akun:this.sg.cells(7,i),nama:'-',dc:"C", keterangan:this.e_ket.getText(), nilai: nilaiToFloat(this.sg.cells(8,i)),kode_pp:this.app._kodePP, kode_drk:'-'};
					}
				}
			}
			
			this.dataJurnal = {rs: { 	rows:rows,
										fields : { 	kode_akun : {type:"S",length:80},
													nama :{type:"S",length:200},
													dc:{type:"S",length:50},
													keterangan:{type:"S",length:200},
													nilai:{type:"N", length:100},
													kode_pp:{type:"S",length:100},
													kode_drk:{type:"S",length:100}
											}
								   }
							};		
		}catch(e){
			system.alert(this,e,"");
		}
	},
	doClick:function(sender){
		if (sender == this.b_gen) {
			this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"dmt_pdd_m","no_pdd",this.app._lokasi+"-PDD"+this.e_periode.getText().substr(2,4)+".","00000"));		
			this.e_dok.setFocus();
		}
		if (sender == this.i_viewer){
			this.createJurnal();			
			this.jurnal.setData(this.dataJurnal);
			this.jurnal.show();
		}
	}
});