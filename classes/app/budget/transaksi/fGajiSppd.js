/**
 * @author dweexfuad
 */
window.app_budget_transaksi_fGajiSppd = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fGajiSppd.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fGajiSppd";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Perhitungan Biaya SPPD", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("saiCBBL;datePicker;checkBox;util_standar");		
			this.eBidang = new saiCBBL(this,{bound:[20,24,200,20],caption:"Bidang", multiSelection:false,change:[this,"doEditChange"]});				
			this.eTahun = new saiLabelEdit(this,{bound:[20,21,182,20],caption:"Tahun",tipeText:ttAngka,maxLength:4});		
			this.ed_nb = new saiLabelEdit(this,{bound:[20,23,230,20],caption:"No Bukti", readOnly:true});					
			this.bGen = new button(this,{bound:[256,23,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doClick"]});		   		
			this.bTampil = new button(this,{bound:[729,23,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new panel(this,{bound:[10,26,800,423],caption:"Daftar"});
			this.sg1 = new saiGrid(this.p1,{bound:[0,20,800,380],colCount:8,
								colFormat:[[5,6,7],[cfNilai, cfNilai,cfNilai,cfNilai]], colWidth:[[0,1,2,3,4,5,6,7],[60,60,60,200,100,100,100]],
								buttonStyle:[[0],[bsAuto]],
				picklist:[[0],[new portalui_arrayMap({items:["NON","APP"]})]],

								change:[this,"doSgChange"]});		
			this.sgn = new sgNavigator(this.p1,{bound:[0,400,800,25],buttonStyle:4, grid:this.sg1, pager:[this,"doPager"]});		

			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();	

			var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];							
				this.eTahun.setText(line.tahun);
			}
			var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'SDM' and tahun = '"+this.eTahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}

			if (this.app._userStatus == "A")
				this.eBidang.setSQL("select kode_bidang, nama from agg_bidang ",["kode_bidang","nama"],false,["Kode","Nama"],"where","Data Bidang",true);			
			else this.eBidang.setSQL("select kode_bidang, nama from agg_bidang where kode_bidang = '"+this.app._kodeBidang+"' ",["kode_bidang","nama"],false,["Kode","Nama"],"and","Data Bidang",true);			
			this.eBidang.setText(this.app._kodeBidang);
			
			this.initColumn();
			
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fGajiSppd.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_transaksi_fGajiSppd.implement({
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
		if (modalResult != mrOk) return;
		try{			
			switch (event)
			{
				case "clear" :
					this.e0.setText("");
					this.e0.setRightLabelCaption("");
					this.e1.setText("");												
					break;
				case "simpan" :
						if (this.prog != "0") {
							system.alert(this,"Transaksi tidak valid.","Transaksi SDM/SPPD telah di Close.");
							return false;
						} 

						uses("server_util_arrayList");
						sql = new server_util_arrayList();									
						this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_sppd_m","no_gaji",this.app._lokasi+"-SPPD"+this.eTahun.getText()+'.',"0000"));
						
						this.nbLama = "";
						var data = this.dbLib.runSQL("select no_gaji from agg_sppd_m where tahun = '"+this.eTahun.getText()+"' and kode_bidang='"+this.eBidang.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						if (data instanceof portalui_arrayMap){				
							if (data.get(0) != undefined){
								this.nbLama = data.get(0).get("no_gaji");
							}
						}
						sql.add("delete from agg_sppd_m where kode_bidang = '"+this.eBidang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun= '"+this.eTahun.getText()+"'");
						sql.add("delete from agg_sppd_d where kode_bidang = '"+this.eBidang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.eTahun.getText()+"%'");
						sql.add("delete from agg_d where no_bukti = '"+this.nbLama+"' and modul='BSPPD' and kode_lokasi='"+this.app._lokasi+"' and tahun= '"+this.eTahun.getText()+"' ");

						sql.add("insert into agg_sppd_m(no_gaji,kode_lokasi,keterangan,tahun,nik_buat, tgl_input,nik_user,kode_bidang) values "+
								"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','-','"+this.eTahun.getText()+"','-',now(),'"+this.app._userLog+"','"+this.eBidang.getText()+"')");					
						var dataProgram, dataBand;						
						for (var i in this.dataSppd.rs.rows){
							line = this.dataSppd.rs.rows[i];							
                            for (var c in this.colTitle){
								if (line.status.toUpperCase() == "APP") {
									dataProgram = this.dataProgram.get(this.colTitle[c]);
									dataBand = this.dataFrekBand.get(line.kode_band+"-"+this.colTitle[c]);
									if (dataBand && (parseFloat(line["t"+this.colTitle[c]]) > 0 || parseFloat(line["h"+this.colTitle[c]]) > 0)){										
										for (var p=1; p <= 12; p++){
											sqlText ="insert into agg_sppd_d(nik, kode_program, kode_rka, kode_akun,periode, posted, kode_pp, nilai, nilai_harian, no_gaji, kode_lokasi,kode_bidang) values ";							
											sqlText += "('"+line.nik+"','"+this.colTitle[c]+"','"+line.kode_rka+"','"+line.kode_akun+"','"+this.eTahun.getText()+(p < 10 ? "0" + p :p)+"','F','"+line.kode_pp+"','"+ Math.round(parseFloat(line["t"+this.colTitle[c]])/12) +"','"+ Math.round(parseFloat(line["h"+this.colTitle[c]])/12)+"','"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.eBidang.getText()+"') ";
											sql.add(sqlText);
										}
										
									}														        							
								}
							}							
						}
						sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,keterangan,jenis_agg) "+
								"		select a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,a.kode_akun,a.kode_pp,a.periode,substring(a.periode,5,2),1,1,a.nilai+a.nilai_harian,'"+this.eTahun.getText()+"','"+this.ed_nb.getText()+"','BSPPD','0',b.nama,'E' "+  
								"		from agg_sppd_d a "+
								"					   inner join agg_rka b on a.kode_rka=b.kode_rka and substring(a.periode,1,4)=b.tahun "+
								"					   inner join agg_drk c on b.kode_drk=c.kode_drk and b.tahun=c.tahun "+						
								"		where kode_bidang = '"+this.eBidang.getText()+"' and a.nilai+a.nilai_harian<> 0 and a.periode like '"+this.eTahun.getText()+"%' and a.kode_lokasi='"+this.app._lokasi+"' ");
						
						this.dbLib.execArraySQL(sql);					
					break;
				case "ubah" :					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						
						this.dbLib.execArraySQL(sql);							
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						
						this.dbLib.execArraySQL(sql);											   
					break;
			}			
		}catch(e){
			system.alert(this, e,"");
		}
	},
	keyPress: function(sender, charCode, buttonState ){
	},
	doEditChange: function(sender){				
	},	
	doTampilClick: function(sender){
		try{			
			var sqlReq = new server_util_arrayList();
			var sql ="select a.nik, ";		    
		    for (var c in this.colTitle) sql += " sum(ifnull(d.h"+this.colTitle[c]+",0))as h"+this.colTitle[c]+",";
		    sql +="sum(";
		    for (var c in this.colTitle) sql += ( c > 0 ? "+":"")+" ifnull(d.h"+this.colTitle[c]+",0)";
		    sql += ") as total2,";				   
		    //for (var c in this.colTitle) sql += " max(ifnull(d.fh"+this.colTitle[c]+",'-')) as fh"+this.colTitle[c]+" ,";
		    sql += " isnull(d.kode_akun,'-') as kode_akun, d.kode_rka ";
			sql += " from agg_karyawan a "+				
				//-mr
				"   inner join agg_pp x on a.kode_pp=x.kode_pp and a.kode_lokasi = x.kode_lokasi "+
				//-mr

				"left join (select a.kode_rka, a.kode_band, b.kode_akun ";
			//for (var c in this.colTitle) sql += ", max(case a.kode_program when '"+this.colTitle[c]+"' then a.frek else '-' end) as fh"+this.colTitle[c];
			for (var c in this.colTitle) sql += ",sum(case a.kode_program when '"+this.colTitle[c]+"' then a.total * b.tarif else 0 end) as h"+this.colTitle[c];										
			sql +=	"	from agg_program_band a "+
				"	inner join agg_program_harian b on a.kode_band=b.kode_band and b.tahun = a.tahun "+
				"	where a.tahun = '"+this.eTahun.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
				"	group by a.kode_rka, a.kode_band, b.kode_akun) d on a.kode_band=d.kode_band "+
				"where  x.kode_bidang = '"+this.eBidang.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.tahun='"+this.eTahun.getText()+"' "+
				" group by a.nik,d.kode_akun,d.kode_rka  ";
			
			var sql1 = sql;
			
			sql = "select a.nik,";
		    for (var c in this.colTitle) sql += " sum(ifnull(c.t"+this.colTitle[c]+",0)) as t"+this.colTitle[c]+",";
		    sql +="sum(";
		    for (var c in this.colTitle) sql += ( c > 0 ? "+":"")+" ifnull(c.t"+this.colTitle[c]+",0)";
		    sql += ") as total1 ";		    
		    //for (var c in this.colTitle) sql += ", max(ifnull(c.ft"+this.colTitle[c]+",'-')) as ft"+this.colTitle[c];
			sql += " from agg_karyawan a "+				
				//-mr
				"   inner join agg_pp x on a.kode_pp=x.kode_pp and a.kode_lokasi = x.kode_lokasi "+
				//-mr

				"left join (select a.kode_band "; 
			//for (var c in this.colTitle) sql += ", max(case a.kode_program when '"+this.colTitle[c]+"' then a.frek else '-' end) as ft"+this.colTitle[c];
			for (var c in this.colTitle) sql += ",sum(case a.kode_program when '"+this.colTitle[c]+"' then  (c.nilai*b.jumlah) else 0 end) as t"+this.colTitle[c];							
			sql += "	from agg_program_band a "+
				"	inner join agg_program_trans b on a.kode_band=b.kode_band and a.kode_program=b.kode_program and b.tahun = a.tahun and b.kode_lokasi = a.kode_lokasi  "+  
				"	inner join agg_norma_trans c on b.kode_band=c.kode_band and b.kode_tarif=c.kode_tarif and c.tahun = a.tahun "+
				"	where b.kode_bidang='"+this.eBidang.getText()+"' and a.tahun = '"+this.eTahun.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
				"	group by a.kode_band ) c on a.kode_band=c.kode_band  "+				
				
				"where x.kode_bidang = '"+this.eBidang.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.tahun='"+this.eTahun.getText()+"' "+
				" group by a.nik ";
			
			var sql2 = sql;	

			
			var sql = "select distinct 'APP' as status, a.nik,a.nama,a.kode_band,a.kode_pp as kode_loker,b.nama as jabatan,  ";
			for (var c in this.colTitle) sql += " x.t"+this.colTitle[c]+" as t"+this.colTitle[c]+",";
			for (var c in this.colTitle) sql += " y.h"+this.colTitle[c]+" as h"+this.colTitle[c]+",";
			sql += " x.total1,";			
			sql += " y.total2,";
			sql += "x.total1 + y.total2 as total3, y.kode_akun ,a.kode_pp,y.kode_rka ";
			//for (var c in this.colTitle) sql += ", y.fh"+this.colTitle[c]+" as fh"+this.colTitle[c]+" ";
			//for (var c in this.colTitle) sql += ", x.ft"+this.colTitle[c]+" as ft"+this.colTitle[c]+" ";						
			sql += " from agg_karyawan a "+
				"inner join agg_pp k on a.kode_pp=k.kode_pp "+
				"inner join agg_jab b on a.kode_jab=b.kode_jab "+
				"inner join ("+sql1+") y on y.nik = a.nik "+
				"inner join ("+sql2+") x on x.nik = a.nik "+
				"where k.kode_bidang = '"+this.eBidang.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.tahun='"+this.eTahun.getText()+"' ";			
			//systemAPI.alert(sql);	
			sqlReq.add(sql);
			sqlReq.add("select kode_band +'-'+kode_program as kode, frek from agg_program_band where kode_lokasi = '"+this.app._lokasi+"' and tahun = '"+this.eTahun.getText()+"' ");
			var temp = this.dbLib.getMultiDataProvider(sqlReq,true);				
			if (typeof temp != "string") {
				this.rowPerPage = 100;
				var line;
				this.dataSppd = temp.result[0];
				this.dataFrekBand = new arrayMap();
				for (var c in temp.result[1].rs.rows){
					line = temp.result[1].rs.rows[c];
					this.dataFrekBand.set(line.kode, line);
				}
				this.sgn.setTotalPage(Math.ceil(temp.result[0].rs.rows.length/ this.rowPerPage));				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
				this.selectPage(1);
			}else systemAPI.alert(temp);
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page){
		this.selectPage(page);	
	},
	selectPage: function(page){		
		this.page = page;
		this.sg1.clear();
		var start = (page - 1) * this.rowPerPage;
		var finish = ( start + this.rowPerPage > this.dataSppd.rs.rows.length ? this.dataSppd.rs.rows.length : start + this.rowPerPage);
		var line, bandFrek, data, total1, total2,total3;
		for (var i=start;i < finish; i++){
			line =  this.dataSppd.rs.rows[i];
			
			data = [];
			total1 = 0;
			total2 = 0;
			total3 = 0;	
			for (var c in line){
				if (c == "total1") 
					line[c] = total1;						
				else if (c == "total2")
					line[c] = total2;						
				else if (c == "total3")
					line[c] = parseFloat(total1) + parseFloat(total2);
				else if (c.substr(0,1) == "t")
					total1 += parseFloat(line[c]);
				else if (c.substr(0,1) == "h" )
					total2 += parseFloat(line[c]);
							
			} 			
			/*for (var c in line){
				
				if (!(c == "nik" || c == "nama" || c == "kode_band" || c == "kode_loker" || c == "jabatan" || c.substr(0,1) == "f" || c == "kode_akun")){
					//data[data.length] = floatToNilai(line[c]);					
					if (c == "total1") 
						line[c] = total1;						
					else if (c == "total2")
						line[c] = total2;						
					else if (c == "total3")
						line[c] = parseFloat(total1) + parseFloat(total2);
					else if (c.substr(0,1) == "t" || c.substr(0,1) == "h" ){										
						bandFrek = this.dataFrekBand.get(line.kode_band+"-"+c.substr(1,2));
						if (bandFrek){
							switch (bandFrek.frek.substr(0,1)){
								case "A": line[c] = (parseFloat(line[c]) * 4 );
								break;
								case "B": line[c] = (parseFloat(line[c]) * 2);
								break;
								case "C": line[c] = (parseFloat(line[c]) * 12);
								break;
								default:
									//if (line.kode_band == "03.01") alert(parseFloat(line[c]) +" "+bandFrek +" "+(bandFrek ? bandFrek.frek:""));
									line[c] = (parseFloat(line[c])  * (bandFrek && bandFrek.frek == "-" ? 1 : bandFrek.frek.split(",").length));
								break;
							}
						}						
					}					
				}						
			}*/
			data = [line.status.toUpperCase(),line.nik, line.nama, line.kode_band, line.kode_loker, line.jabatan];
			total1 = 0;			
			for (var c in this.colTitle) {
				data[data.length] = floatToNilai(line["t"+this.colTitle[c]]);
				total1 += parseFloat(line["t"+this.colTitle[c]]);
			}
			data[data.length] = floatToNilai(total1);
			total2 = 0;
			for (var c in this.colTitle) {
				data[data.length] = floatToNilai(line["h"+this.colTitle[c]]);
				total2 += parseFloat(line["h"+this.colTitle[c]]);
			}
			data[data.length] = floatToNilai(total2);
			data[data.length] = floatToNilai(total1 + total2);		
			//alert(data.length);
			this.sg1.appendData(data);
		}		
		this.sg1.setNoUrut(start);
	},
	doClick: function(sender){
		try{
			if (sender == this.bGen){
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_sppd_m","no_gaji",this.app._lokasi+"-SPPD"+this.eTahun.getText()+'.',"0000"));
			}
		}catch(e){
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)
						system.info(this,"Transaksi Sukses ("+ this.ed_nb.getText()+")");
					else system.alert(this, result); 
					break;
			}
		}
	},
	initColumn: function(){
		try{
			var data = this.dbLib.getDataProvider("select kode_program, kode_program+'-'+nama as nama from agg_program where kode_lokasi = '"+this.app._lokasi+"' order by kode_program",true);
			if (typeof data != "string"){							
				this.sg1.setColCount(((data.rs.rows.length+1)*2) + 7);	
				//alert(((data.rs.rows.length+1)*2) + 6);
									
				var title = [];	
				var hint = ["STATUS","NIK","NAMA","BAND","LOKER","JABATAN"];				
				var line;
			
				this.sg1.columns.get(5).setColWidth(150);
				this.fields = [];
				this.dataProgram = new portalui_arrayMap();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					title.push(line.kode_program);					
					hint.push(line.nama.toUpperCase());
					this.sg1.columns.get(parseInt(i)+6).setHint(line.nama);
					this.sg1.columns.get(parseInt(i)+6).setColumnFormat(cfNilai);
					
					if (line.nama.length * 7 <= 80)
						this.sg1.columns.get(parseInt(i)+6).setColWidth(80);
					else this.sg1.columns.get(parseInt(i)+6).setColWidth(line.nama.length * 7);
					this.fields[this.fields.length] = "t"+line.kode_program;
					this.dataProgram.set(line.kode_program, line);
				}
				hint.push("JML TRANSPORT");
				this.fields[this.fields.length] = "total1";
				this.sg1.columns.get(data.rs.rows.length+6).setColumnFormat(cfNilai);				
				
				i=0;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					//title.push(line.kode_program);	
					hint.push(line.nama.toUpperCase());
					this.sg1.columns.get(parseInt(i)+data.rs.rows.length+7).setHint(line.nama);
					this.sg1.columns.get(parseInt(i)+data.rs.rows.length+7).setColumnFormat(cfNilai);
					if (line.nama.length * 7 <= 80)
						this.sg1.columns.get(parseInt(i)+data.rs.rows.length+7).setColWidth(80);
					else this.sg1.columns.get(parseInt(i)+data.rs.rows.length+7).setColWidth(line.nama.length * 7);
					this.fields[this.fields.length] = "h"+line.kode_program;
				}
				hint.push("JML HARIAN");
				this.sg1.columns.get(parseInt(i)+data.rs.rows.length+8).setColumnFormat(cfNilai);				
				this.fields[this.fields.length] = "total2";
				hint.push("TOTAL");
				this.sg1.columns.get(parseInt(i)+data.rs.rows.length+9).setColumnFormat(cfNilai);				
				this.fields[this.fields.length] = "total3";
				
				this.sg1.setColWidth([1],[200]);
				this.sg1.setColTitle(hint);
				this.colTitle = title;
				this.sg1.setButtonStyle([0],[bsAuto]);
				this.sg1.setPickList([0],[new arrayMap({items:["APP","NON"]})]);
			}
		}catch(e){
			alert(e);
		}
	},
	doSgChange: function(sender, col, row){
		if (col == 0)this.dataSppd.rs.rows[(this.page - 1) * this.rowPerPage + row].status = sender.cells(0,row);
	}
});
